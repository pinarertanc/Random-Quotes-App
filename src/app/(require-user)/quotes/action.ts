'use server';

import { listAllQuotes } from "@/repositories/quotes";
import { auth0 } from "@/lib/auth0";
import { deleteQuoteById } from "@/repositories/quotes";
import { revalidatePath } from "next/cache";

export async function getQuotes(){

  return listAllQuotes()
}

export async function deleteQuote(quoteId: string) {
  
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!session || !userId) {
    throw new Error('Please log in.');
  }

 const success = await deleteQuoteById(quoteId, userId);

  if (success) {

    revalidatePath('/user/quotes');
    revalidatePath('/');
  }

  return { success };
}





