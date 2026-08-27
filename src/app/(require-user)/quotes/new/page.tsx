'use client';
import {Field, FieldGroup, FieldError, FieldLabel} from "@/app/components/ui/field";
import {Input} from "@/app/components/ui/input";
import {Button} from "@/app/components/ui/button";
import { useActionState, useContext, useEffect } from "react";
import {handleNewQuote} from "@/app/(require-user)/quotes/new/action";
import { Spinner } from "@/app/components/ui/spinner";
import { redirect } from "next/navigation";
import { QuotesContext } from "@/app/(context)/QuotesContext";


const initialFormState = {
  success: false,
}


export default function NewQuotePage(){

    const [state, dispatchAction, isPending] = useActionState(handleNewQuote, initialFormState);
    const {addQuote} = useContext(QuotesContext);

    useEffect(() => {
    if (state?.success && state?.data) {
      addQuote?.({
      quote: state.data.quote,
      author: state.data.author
    });
      redirect('/quotes/new/success');
    }
  }, [state?.success, state?.data, addQuote]);

    if(isPending){
      return (
        <div>
          <Spinner className="flex min-h-full items-center justify-center"></Spinner>
            </div>
      )
    }

  return(
    
    <form autoComplete="off" className="w-full max-w-3xl mx-auto my-20 sm:my-40 px-4 sm:px-8" action={dispatchAction}>
      
     <FieldGroup>
          <Field>
            <FieldLabel htmlFor="quote">Quote</FieldLabel>
            <Input type="text" id="quote" name="quote" defaultValue={state.data?.quote}></Input>
            {state.errors?.fieldErrors?.quote && (
            <FieldError errors={state.errors?.fieldErrors.quote}>
              {state.errors?.fieldErrors?.quote?.join(', ')}
            </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="author">Author</FieldLabel>
            <Input type="text" id="author" name="author" defaultValue={state.data?.author}></Input>
            {state.errors?.fieldErrors?.author && (
            <FieldError errors={state.errors?.fieldErrors.author}>
              {state.errors?.fieldErrors?.author?.join(', ')}
            </FieldError>
          )}
          </Field>
          <Button type="submit">Add New Quote</Button>
        </FieldGroup>
       
    </form>


  )
}