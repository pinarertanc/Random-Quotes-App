'use client';
import { Button } from "@/app/components/button";
import { Quote } from "@/app/components/quote";
import { Autor } from "@/app/components/autor";
import { useContext } from "react";
import { QuotesContext } from "@/app/context/QuotesContext";
import { userId } from "@/lib/auth";
import Link from "next/link";


export default function FavoriteQuotesPage (){

  const { myQuotes, handleLike } = useContext(QuotesContext);

  const likedQuotes =myQuotes?.filter(quote => quote.likedBy?.includes(userId));
  
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-90 px-36 bg-white dark:bg-black sm:items-start">
    {likedQuotes.map((quote)=> {
       const isLiked = quote.likedBy?.includes(userId);
    
    return (
        <div key={quote.quote} className="py-3">
              <Button onClick = {handleLike} label= {isLiked? "💔" : "❤️"} variant="icon" />
              <Quote label={`${quote.quote}`}/>
              <Autor label={`- ${quote.autor}`}/>
            </div>
    )
})}
    {likedQuotes.length === 0 ? (<h1>No quotes were liked yet.Check quotes <Link href="/" >here</Link></h1>
    ) : (<></>)
  } 
    </main>
  );
}