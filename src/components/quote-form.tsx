'use client';

import {Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { useActionState, useEffect } from "react";
import {Spinner} from '@/components/ui/spinner';
import { useForm } from "react-hook-form";
import { NewQuoteSchema, ReadingStatus } from "@/types/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { QuoteFormProps, QuoteFormData } from '@/types/quotes-document';


export function QuoteForm ({
  action,
  initialData,
  submitLabel = 'Submit',
  successRedirectUrl, 
} :QuoteFormProps ){

  const router =useRouter();

  const [state, dispatchAction, isPending] = useActionState(action, {success: false});

  const {
    register,
    formState: { errors },
  } = useForm<QuoteFormData>({ mode: "onBlur", resolver: zodResolver(NewQuoteSchema),
    values :{
      quote : initialData?.quote || "",
      author: initialData?.author || "",
      category: initialData?.category ?? ReadingStatus.WANT_TO_READ,
      title: initialData?.title || "",
    }
   });

   useEffect(() => {
    if (state?.success) {
      router.push(successRedirectUrl);
    }
  }, [state?.success, router, successRedirectUrl]);

  if(isPending){
    return (
      <div>
        <Spinner className="flex min-h-full items-center justify-center"></Spinner>
      </div>
    );
  }

  const quoteError = state.errors?.fieldErrors?.quote;
  const authorError = state.errors?.fieldErrors?.author;
  const categoryError = state.errors?.fieldErrors?.category;
  const titleError = state.errors?.fieldErrors?.title;

  return(

    <form
      autoComplete="off"
      className="w-full max-w-3xl mx-auto my-20 sm:my-40 px-4 sm:px-8"
      action={dispatchAction}
      aria-describedby={state.message}
    >
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id}  />
      )}

      {state.message && (
        <p id="form-error" role="alert" className="text-destructive">
          {state.message}
        </p>
      )}
      <FieldGroup>
      {/* Quote */}
        <Field>
          <FieldLabel htmlFor="quote">Quote</FieldLabel>
          <Input
            type="text"
            id="quote"
            aria-invalid={quoteError ? "true" : "false"}
            {...register("quote")}
          />
          {quoteError && (
            <FieldError errors={quoteError}>
              {quoteError.join(", ")}
            </FieldError>
          )}
        </Field>

        {/* Author */}
        <Field>
          <FieldLabel htmlFor="author">Author</FieldLabel>
          <Input
            type="text"
            id="author"
           
            aria-invalid={authorError ? "true" : "false"}
            {...register("author")}
          />
          {authorError && (
            <FieldError errors={authorError}>
              {authorError.join(", ")}
            </FieldError>
          )}
        </Field>

        {/* Book Title */}
        <Field>
          <FieldLabel htmlFor="title">Book Title</FieldLabel>
          <Input
            type="text"
            id="title"
            
            aria-invalid={titleError ? "true" : "false"}
            {...register("title")}
          />
          {titleError && (
            <FieldError errors={titleError}>
              {titleError.join(", ")}
            </FieldError>
          )}
        </Field>

        {/* Category / Reading Status */}
        <Field>
          <FieldLabel htmlFor="category">Reading Status:</FieldLabel>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {Object.values(ReadingStatus).map((catValue) => (
              <label
                key={catValue}
                htmlFor={`category-${catValue}`}
                className="flex justify-start gap-1 p-3 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`category-${catValue}`}
                  value={catValue}
                 
                  {...register("category")}
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

          {categoryError && (
            <FieldError errors={categoryError}>
              {categoryError.join(", ")}
            </FieldError>
          )}
        </Field>

        <Button type="submit">{submitLabel}</Button>
      </FieldGroup>
    </form>


  )

}
