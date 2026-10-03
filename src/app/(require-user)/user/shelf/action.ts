
"use server";

import { quotesCollection } from "@/lib/db/collections"; 
import { ReadingStatus } from "@/types/quotes";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateQuoteCategory(quoteId: string, newCategory: ReadingStatus) {
  try {
    const collection = await quotesCollection();

    await collection.updateOne(
      { _id: new ObjectId(quoteId) },
      { $set: { category: newCategory } }
    );

    revalidatePath("/user/shelf");

    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}