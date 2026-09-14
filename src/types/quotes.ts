import {z} from 'zod';


export enum ReadingStatus {
  READ = "Read",
  CURRENTLY_READING = "Currently Reading",
  WANT_TO_READ = "Want to Read",
}

export interface NewQuoteFormState {
  success: boolean,
  data?: {
    author?: string,
    quote? : string,
    title?: string,
    category?: string;
  };
  errors?: {
    fieldErrors: {
      author?: string[],
      quote?: string[],
      title?: string[],
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
  title?: string;
 
}

export const NewQuoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Book title is required.')
    .min(2, 'Book title must be at least 2 characters long.')
    .max(100, 'Book title cannot exceed 100 characters.'),
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
  category: z.enum(ReadingStatus, {
    message: 'Please select a valid category from the list.',
  }),
});
