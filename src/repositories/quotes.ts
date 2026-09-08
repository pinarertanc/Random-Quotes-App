
import { ObjectId } from 'mongodb';
import { quotesCollection } from '@/lib/db/collections';
import type { myQuotesProps, QuoteSeed } from '@/types/quotes';
import type { QuoteDocument } from '@/types/quotes-document';

function toQuote(document: QuoteDocument): myQuotesProps {
  return {
    id: document._id.toHexString(),
    quote: document.quote,
    author: document.author,
    likedBy: document.likedBy ?? [],
    createdBy: document.createdBy,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

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
      createdBy: 'seed',
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
  createdBy: string;
}): Promise<myQuotesProps> {
  const collection = await quotesCollection();
  const now = (new Date()).toString();
  const document: QuoteDocument = {
    _id: new ObjectId(),
    quote: input.quote,
    author: input.author,
    likedBy: [],
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now
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

export async function deleteQuoteById(quoteId: string): Promise<boolean> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return false;
  }

  const collection = await quotesCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}