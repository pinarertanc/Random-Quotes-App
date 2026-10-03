'use server'

import { auth0 } from "@/lib/auth0";
import { listAddedQuotes } from "@/repositories/quotes";


export async function getAddedQuotesAction() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return [];
  }

  const addedQuotes = await listAddedQuotes(userId);
  return addedQuotes;
}