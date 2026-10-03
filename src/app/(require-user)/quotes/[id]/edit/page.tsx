import { QuoteForm } from "@/components/quote-form";
import { updateAddedQuoteAction } from "./action";
import { getQuoteById } from "@/repositories/quotes";

export default async function EditQuotePage({params}:{
  params: Promise<{ id: string }>;
}){

  const { id } = await params;
  const quote = await getQuoteById(id);

  console.log("Edit Page - Fetched Quote:", quote);

  return(

    <QuoteForm
      action={updateAddedQuoteAction}
      initialData= {quote}
      submitLabel="Update Quote"
      successRedirectUrl="/user/quotes/added"
      >
    </QuoteForm>
  )
}