import {z} from 'zod';


export enum QuoteCategory {
  BOOK = 'Book',
  SONG = 'Song',
  RANDOM = 'Random',
}

export interface NewQuoteFormState {
  success: boolean,
  data?: {
    author?: string,
    quote? : string
    category?: string;
  };
  errors?: {
    fieldErrors: {
      author?: string[],
      quote?: string[]
      category?: string[]
    }
  },
  message?: string 
}

export interface myQuotesProps {
  id?: string;
  quote:string;
  author:string;
  likedBy?: string[];
  category?: string[];
 
}

export const NewQuoteSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(1, 'Quote content cannot be empty.')
    .min(3, 'Quote must be at least 3 characters long.')
    .max(500, 'Quote cannot exceed 500 characters.'),
  author: z
    .string()
    .trim()
    .min(1, 'Author name is required.')
    .max(50, 'Author name cannot exceed 50 characters.'),
  category: z.enum(QuoteCategory, {
    message: 'Please select a valid category from the list.',
  }),
});
