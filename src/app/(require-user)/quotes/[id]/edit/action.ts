'use server';

import {auth0} from '@/lib/auth0';
import { updateAddedQuote } from '@/repositories/quotes';
import { ReadingStatus } from '@/types/quotes';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAddedQuoteAction(
  prevState: any,
  formData: FormData
  
){
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  const id = formData.get("id") as string;
  const quote = formData.get("quote") as string;
  const author = formData.get("author") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as ReadingStatus;


  const success = await updateAddedQuote(id, userId, {quote, author, title, category});

  if (success) {
    revalidatePath("/user/quotes/added"); 
    redirect("/user/quotes/added");
  }

  return { success: false, error: "Failed to update quote" };
}
