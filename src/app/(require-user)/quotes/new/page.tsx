import { QuoteForm } from "@/components/quote-form";
import { handleNewQuote } from "./action";

export default function NewQuotePage(){
  return(

    <QuoteForm
      action={handleNewQuote}
      submitLabel="Add New Quote"
      successRedirectUrl="/quotes/new/success"
      >
    </QuoteForm>
  )
}