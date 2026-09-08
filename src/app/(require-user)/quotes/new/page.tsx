'use client';
import { Field, FieldGroup, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { handleNewQuote } from "@/app/(require-user)/quotes/new/action";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { NewQuoteSchema, QuoteCategory } from "@/types/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";



const initialFormState = {
  success: false,
}


export default function NewQuotePage() {

  const router = useRouter();
  const [state, dispatchAction, isPending] = useActionState(handleNewQuote, initialFormState);
  const { register, formState: { errors }} = useForm({ mode: 'onChange', resolver: zodResolver(NewQuoteSchema) });

  useEffect(() => {
    if (state?.success) {
      router.push('/quotes/new/success');
    }
  }, [state?.success, router]);

  if (isPending) {
    return (
      <div>
        <Spinner className="flex min-h-full items-center justify-center"></Spinner>
      </div>
    )
  }

  return (

    <form autoComplete="off" className="w-full max-w-3xl mx-auto my-20 sm:my-40 px-4 sm:px-8" action={dispatchAction}>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="quote">Quote</FieldLabel>
          <Input type="text" id="quote" defaultValue={state.data?.quote} {...register('quote', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Minimum quote length should be 3 characters.' },
            maxLength: { value: 500, message: 'The quote is too long, try another quote below 500 characters.' }
          })}></Input>
          {(errors?.quote && !state.errors?.fieldErrors.quote) && (
            <FieldError errors={errors?.quote?.message}>
              {errors?.quote?.message}
            </FieldError>
          )}

          {state.errors?.fieldErrors?.quote && (
            <FieldError errors={state.errors?.fieldErrors.quote}>
              {state.errors?.fieldErrors?.quote?.join(', ')}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="author">Author</FieldLabel>
          <Input type="text" id="author" name="author" defaultValue={state.data?.author}
            {...register('author')}></Input>
          {(errors?.author && !state.errors?.fieldErrors.author) && (
            <FieldError errors={errors?.author?.message}>
              {errors?.author?.message}
            </FieldError>
          )}

          {state.errors?.fieldErrors?.author && (
            <FieldError errors={state.errors?.fieldErrors.author}>
              {state.errors?.fieldErrors?.author?.join(', ')}
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
            <FieldError errors={state.errors?.fieldErrors.category}>
              {state.errors?.fieldErrors?.category?.join(', ')}
            </FieldError>
          )}
        </Field>

        <Button type="submit">Add New Quote</Button>
      </FieldGroup>

    </form>


  )
}