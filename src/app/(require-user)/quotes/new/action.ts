'use server';

import { auth0 } from "@/lib/auth0";
import { insertQuote } from "@/repositories/quotes";
import { NewQuoteFormState, NewQuoteSchema } from "@/types/quotes";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
    quote: String(formData.get('quote') ?? ''),
    author: String(formData.get('author') ?? ''),
    category: String(formData.get('category') ?? ''),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: String(formData.get('title') ?? ''),
    addedBy:session.user.sub,
    
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
        category: rawData.category as any, // veya uygun tip
        title: rawData.title,
      }
    }
  } 

  try {
    await insertQuote({
      quote: safeParsedResult.data.quote,
      author: safeParsedResult.data.author,
      category: safeParsedResult.data.category,
      title: safeParsedResult.data.title,
      createdAt: rawData.createdAt, // <-- rawData'dan alıyoruz
      updatedAt: rawData.updatedAt,
      addedBy: session.user.sub // <-- rawData'dan alıyoruz
    });
    
    revalidatePath('/');
    revalidatePath('/user/quotes/added');

    return {
      success: true,
      data: {
        quote: safeParsedResult.data.quote,
        author: safeParsedResult.data.author,
        category: safeParsedResult.data.category as any,
        title: safeParsedResult.data.title,
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to insert quote. Please try again later.'
    };
  }
}