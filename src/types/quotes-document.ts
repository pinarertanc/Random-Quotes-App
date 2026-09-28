import type { ObjectId } from 'mongodb';
import { myQuotesProps } from './quotes';

export interface QuoteDocument {
  _id: ObjectId;
  quote: string;
  author: string;
  likedBy: string[];
  title: string;
  addedBy: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface QuoteCardProps {
  quote: myQuotesProps;
  isLiked?: boolean;
  currentUserId?: string;
  onToggleLike?: (quoteId: string) => Promise<void>;
  onDelete?: (quoteId: string) => Promise<void>;
}