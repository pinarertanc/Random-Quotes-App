'use server';
import { ObjectId } from 'mongodb';
import { quotesCollection } from '@/lib/db/collections';
import { ReadingStatus, type myQuotesProps, type QuoteSeed } from '@/types/quotes';
import type { QuoteDocument } from '@/types/quotes-document';

function toQuote(document: QuoteDocument): myQuotesProps {
  return {
    id: document._id.toHexString(),
    quote: document.quote,
    author: document.author,
    likedBy: document.likedBy ?? [],
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    addedBy: document.addedBy ?? '',
    title: document.title,
}}

function parseQuoteObjectId(quoteId: string): ObjectId | null {
  if (!ObjectId.isValid(quoteId)) {
    return null;
  }

  return new ObjectId(quoteId);
}

export async function insertQuotes(seedQuotes: QuoteSeed[]): Promise<void> {
  const collection = await quotesCollection();

  await collection.insertMany(
    seedQuotes.map((seedQuote) => ({
      _id: new ObjectId(),
      quote: seedQuote.quote,
      author: seedQuote.author,
      likedBy: [] as string[],
      addedBy: 'seed',
      title: seedQuote.title ?? 'Seed Quote',
      category: seedQuote.category ?? 'General',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    })),
  );
}

export async function listAllQuotes(): Promise<myQuotesProps[]> {
  const collection = await quotesCollection();
  //.sort({ _id: 1 }) - ascending order
  const documents = await collection.find({}).sort({ _id: 1 }).toArray();
  return documents.map(toQuote);
}

export async function listAddedQuotes(userId: string): Promise<myQuotesProps[]>{
  const collection = await quotesCollection();
  const documents = await collection
  .find({addedBy: userId})
  .sort({_id: 1})
  .toArray();
  return documents.map(toQuote);
}


export async function listBooksByReadingCategory(userId: string, category:ReadingStatus): Promise<myQuotesProps[]>{
  const collection = await quotesCollection();
  const documents = await collection.find({category: category, addedBy: userId})
  .sort({_id: -1})
  .toArray();
  return documents.map(toQuote);
}

export async function listFavouriteQuotes(userId: string): Promise<myQuotesProps[]> {
  const collection = await quotesCollection();
  const documents = await collection
    .find({ likedBy: userId })
    .sort({ _id: 1 })
    .toArray();
  return documents.map(toQuote);
}

export async function insertQuote(input: {
  quote: string;
  author: string;
  category: ReadingStatus;
  title: string;
  createdAt:string;
  updatedAt: string;
  addedBy: string;
}): Promise<myQuotesProps> {
  const collection = await quotesCollection();
  const now = (new Date()).toString();
  const document: QuoteDocument = {
    _id: new ObjectId(),
    quote: input.quote,
    author: input.author,
    likedBy: [],
    createdAt: now,
    updatedAt: now,
    category: input.category,
    title: input.title,
    addedBy:input.addedBy,
  
  };
  await collection.insertOne(document);

  return toQuote(document);
}

export async function updateQuoteLikedBy(
  quoteId: string,
  userId: string,
): Promise<myQuotesProps | null> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return null;
  }

  const collection = await quotesCollection();
  const existing = await collection.findOne({ _id: objectId });

  if (!existing) {
    return null;
  }

  const alreadyLiked = existing.likedBy.includes(userId);
  const updated = await collection.findOneAndUpdate(
    { _id: objectId },
    alreadyLiked
      ? { $pull: { likedBy: userId } }
      : { $addToSet: { likedBy: userId } },
    { returnDocument: 'after' },
  );

  return updated ? toQuote(updated) : null;
}

export async function deleteQuoteById(quoteId: string, userId: string): Promise<boolean> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return false;
  }

  const collection = await quotesCollection();
  const result = await collection.deleteOne({ 
    _id: objectId,
    addedBy: userId
  
  });
  
  return result.deletedCount === 1;
}

export async function updateAddedQuote(
  id:string,
  userId:string,
  data:{
      quote: string;
      author: string;
      category: ReadingStatus;
      title: string;
  }
) {
  const collection = await quotesCollection();
  const documents = await collection
  .updateOne(
    {addedBy: userId, _id: new ObjectId(id)},
    {$set:{
      quote: data.quote,
      author: data.author,
      title: data.title,
      category: data.category
    }},

  )
  return documents.modifiedCount > 0;
  

}

export async function getQuoteById(id: string): Promise<myQuotesProps | null> {
  const collection = await quotesCollection();
  
  const quote = await collection.findOne({ _id: new ObjectId(id) });

  

  if (!quote) return null;

  return {
    id:quote._id.toString(),
    quote: quote.quote,
    author: quote.author,
    title: quote.title,
    category: quote.category,
    addedBy: quote.addedBy,
  } as myQuotesProps;
}