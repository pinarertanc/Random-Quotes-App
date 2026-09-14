'use client';
import { Field, FieldGroup, FieldError, FieldLabel } from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useActionState, useContext, useEffect } from "react";
import { handleNewQuote } from "@/app/(require-user)/quotes/new/action";
import { Spinner } from "@/app/components/ui/spinner";
import { redirect } from "next/navigation";
import { QuotesContext } from "@/app/(context)/QuotesContext";
import { NewQuoteFormState } from "types/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewQuoteSchema } from "types/quotes";
import { useForm } from "react-hook-form";
import { QuoteCategory } from "types/quotes";


const initialFormState: NewQuoteFormState = {
  success: false,
}


export default function NewQuotePage() {

  const [state, dispatchAction, isPending] = useActionState(handleNewQuote, initialFormState);
  const { addQuote } = useContext(QuotesContext);
  const { register, formState: { errors } } = useForm({ mode: 'onBlur', resolver: zodResolver(NewQuoteSchema) });

  useEffect(() => {
    if (state?.success && state?.data) {
      addQuote?.({
        quote: state.data.quote,
        author: state.data.author
      });
      redirect('/quotes/new/success');
    }
  }, [state?.success, state?.data, addQuote]);

  if (isPending) {
    return (
      <div>
        <Spinner className="flex min-h-full items-center justify-center"></Spinner>
      </div>
    )
  }

  const quoteError = state.errors?.fieldErrors?.quote;
  const authorError = state.errors?.fieldErrors?.author;
  const categoryError = state.errors?.fieldErrors?.category;

  return (

    <form autoComplete="off" className="w-full max-w-3xl mx-auto my-20 sm:my-40 px-4 sm:px-8" action={dispatchAction} aria-describedby={state.message}>
      {
        state.message && (
          <p id="form-error" role="alert" className="text-destructive">{state.message}</p>

        )
      }
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="quote">Quote</FieldLabel>
          <Input type="text" id="quote" name="quote" defaultValue={state.data?.quote} aria-invalid={quoteError ? "true" : "false"}
            aria-describedby={quoteError ? "quote-error" : undefined}
            {...register('quote')}></Input>
          {quoteError && (
            <FieldError id="quote-error" role="alert" errors={quoteError}>
              {quoteError.join(', ')}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="author">Author</FieldLabel>
          <Input type="text" id="author" name="author" defaultValue={state.data?.author} aria-invalid={authorError ? "true" : "false"}
            aria-describedby={authorError ? "author-error" : undefined} 
            {...register('author')} ></Input>
          {authorError && (
            <FieldError id="author-error" role="alert" errors={authorError}>
              {authorError.join(', ')}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="category">This Quote From:</FieldLabel>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {Object.values(QuoteCategory).map((catValue) => (
              <label
                key={catValue}
                htmlFor={`category-${catValue}`}
                className="flex justify-start gap-1 p-3 cursor-pointer  "
              >
                <input
                  type="radio"
                  id={`category-${catValue}`}
                  value={catValue}
                  defaultChecked={state.data?.category === catValue}
                  {...register('category')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <span className="text-sm font-medium">{catValue}</span>
              </label>
            ))}
          </div>

          {errors?.category && (
            <FieldError errors={errors.category.message}>
              {errors.category.message}
            </FieldError>
          )}

          {state.errors?.fieldErrors?.category && (
            <FieldError errors={categoryError}>
              {categoryError.join(', ')}
            </FieldError>
          )}
        </Field>

        <Button type="submit">Add New Quote</Button>
      </FieldGroup>

    </form>


  )
}


