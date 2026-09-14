'use server';

import { auth0 } from "@/lib/auth0";
import { NewQuoteFormState, NewQuoteSchema, QuoteCategory } from "types/quotes";
import {z} from 'zod';



export async function handleNewQuote(
   _currentState: NewQuoteFormState,
   formData: FormData,
   ): Promise<NewQuoteFormState> {

  const session = await auth0.getSession();

  if(!session){
    return{
      success: false,
      message: 'Please log in.'
    }
  }

  const rawData ={
    quote:formData.get('quote') ?? '',
    author:formData.get('author') ?? '',
    category:formData.get('category') ?? ''
  };

 const safeParsedResult = NewQuoteSchema.safeParse(rawData);
 

 if(!safeParsedResult.success){
  const errors = z.flattenError(safeParsedResult.error);
  return{
    success: false,
    errors: {
    fieldErrors: errors.fieldErrors
 },
 data:{
  quote: rawData.quote?.toString() || "",
  author: rawData.author?.toString() || "",
  category: rawData.category as QuoteCategory

 }}
 } else{
  return{
    success:true,
    data: {
      quote: safeParsedResult.data.quote,
      author: safeParsedResult.data.author,
      category: safeParsedResult.data.category
    }
    
  }
 }}