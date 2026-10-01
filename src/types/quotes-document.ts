import type { ObjectId } from 'mongodb';
import { myQuotesProps, ReadingStatus,NewQuoteSchema } from './quotes';
import {z} from "zod";

export interface QuoteDocument {
  _id: ObjectId;
  id?: string;
  quote: string;
  author: string;
  likedBy: string[];
  title: string;
  addedBy: string
  createdAt: string;
  updatedAt: string;
  category: ReadingStatus;
}

export interface QuoteCardProps {
  quote: myQuotesProps;
  isLiked?: boolean;
  currentUserId?: string;
  onToggleLike?: (quoteId: string) => Promise<unknown>;
  onDelete?: (quoteId: string) => Promise<unknown>;
  editHref?: string; 
}

export interface QuoteFormProps{
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: Partial<myQuotesProps>;
  submitLabel?: string;
  successRedirectUrl: string;
}

export type QuoteFormData = z.infer<typeof NewQuoteSchema>;