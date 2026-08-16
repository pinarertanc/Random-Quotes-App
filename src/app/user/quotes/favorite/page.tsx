'use client';
import { Button, ButtonVariant } from "@/app/components/ui/button";
import { Quote } from "@/app/components/quote";
import { Autor } from "@/app/components/autor";
import { useContext } from "react";
import { QuotesContext } from "@/app/context/QuotesContext";
import Link from "next/link";
import {Card} from "@/app/components/card";
import { ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function FavoriteQuotesPage (){

  const {user} = useUser();
  const userId =user?.sub;

  const { myQuotes, handleLike } = useContext(QuotesContext);

  const likedQuotes =myQuotes?.filter(quote => quote.likedBy?.includes(userId));
  
  return (
    <main className="m-auto flex flex-1 w-full max-w-3xl flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
    {likedQuotes.map((quote, idx)=> {
       const isLiked = (quote.likedBy || []).includes(userId);
    
    return (
       <div key={`${quote.quote}-${idx}`} className="py-3 px-6 m-auto w-full flex justify-center">
          <Card variant="liked-card">
              <Button onClick={()=> handleLike(quote)} variant={ButtonVariant.Ghost} type="button" aria-label={isLiked ? "Unlike the quote" : "Like the quote"}>
            <ThumbsUpIcon 
            size={32} 
            weight={isLiked ? "fill" : "regular"} 
            color={isLiked ? "var(--chart-2)" : "currentColor"}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
          </Button>
              <Quote label={`${quote.quote}`}/>
              <Autor label={`- ${quote.autor}`}/>   
          </Card>
      </div>
    )
})}
    
    
    {likedQuotes.length === 0 && (
        <div className="flex m-auto w-full max-w-xl text-center items-center justify-center">
          <Card variant="liked-card">
            <h1>
              No quotes were liked yet. Check quotes{" "}
              <Link href="/" className="underline text-blue-500">
                here
              </Link>
            </h1>
          </Card>
        </div>
      )}
    </main>
  );
}