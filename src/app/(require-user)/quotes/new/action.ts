'use server';

import { auth0 } from "@/lib/auth0";
import { insertQuote } from "@/repositories/quotes";
import { NewQuoteFormState, NewQuoteSchema } from "@/types/quotes";
import { z } from 'zod';
import {revalidatePath} from 'next/cache';
import { redirect } from "next/navigation";

export async function handleNewQuote(
  _currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {

  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in.'
    }
  }

  const rawData = {
    quote: formData.get('quote') ?? '',
    author: formData.get('author') ?? '',
    category: formData.get('category') ?? '',
    createdAt: new Date().toString() ?? '',
    updatedAt: new Date().toString() ?? '',
  };

  const safeParsedResult = NewQuoteSchema.safeParse(rawData);


  if (!safeParsedResult.success) {
    const errors = z.flattenError(safeParsedResult.error);
    return {
      success: false,
      errors: {
        fieldErrors: errors.fieldErrors
      },
      data: {
        quote: rawData.quote,
        author: rawData.author,
        category: rawData.category,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt

      }
    }
  } 

  try {
    await insertQuote({
      quote: safeParsedResult.data.quote,
      author: safeParsedResult.data.author,
      category: safeParsedResult.data.category,
      createdAt: safeParsedResult.data.createdAt,
      updatedAt: safeParsedResult.data.updatedAt,
      createdBy: session.user.sub
    });
    revalidatePath('/');

    return {
      success: true,
      data: {
        quote: safeParsedResult.data.quote,
        author: safeParsedResult.data.author,
        category: safeParsedResult.data.category,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to insert quote. Please try again later.'
      };
}

}