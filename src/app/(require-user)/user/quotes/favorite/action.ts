'use server';

import { auth0 } from "@/lib/auth0";
import { updateQuoteLikedBy, listFavouriteQuotes } from "@/repositories/quotes";
import { revalidatePath } from 'next/cache';

export async function toggleLikeQuote(quoteId: string) {  

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

export async function getFavouriteQuotesAction() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return [];
  }

  const likedQuotes = await listFavouriteQuotes(userId);
  return likedQuotes;
}