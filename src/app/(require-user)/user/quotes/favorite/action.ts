'use server';

import { auth0 } from "@/lib/auth0";
import { updateQuoteLikedBy } from "@/repositories/quotes";
import {revalidatePath} from 'next/cache';

export async function toggleLikeQuote(quoteId: string, userId: string) {  

  const session = await auth0.getSession();
  
  if (!session?.user) {
    throw new Error('Please log in.');
  }

  const updatedQuote = await updateQuoteLikedBy(quoteId, session.user.sub);

  if (updatedQuote) {
    revalidatePath('/');
    revalidatePath('/user/quotes/favorite');
  }

  return { success: !!updatedQuote };
}