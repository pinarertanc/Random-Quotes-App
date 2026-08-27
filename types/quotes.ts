import {z} from 'zod';

export interface NewQuoteFormState {
  success: boolean,
  data?: {
    author?: string,
    quote? : string
  };
  errors?: {
    fieldErrors: {
      author?: string[],
      quote?: string[]
    }
  },
  message?: string 
}

export interface myQuotesProps {
  id?: string;
  quote:string;
  author:string;
  likedBy?: string[];
}

export const NewQuoteSchema = z.object({
  quote: z.string().trim().min(3,'Please enter min. 3 characters.').max(500,'Please enter max. 500 characters.'),
  author: z.string().trim().min(1,'Please enter min. 1 character.').max(50,'Please enter max. 50 characters.')
})