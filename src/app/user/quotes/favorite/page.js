'use client';
import { Button } from "@/app/components/button";
import { Quote } from "@/app/components/quote";
import { Autor } from "@/app/components/autor";
import { useContext } from "react";
import { QuotesContext } from "@/app/context/QuotesContext";
import { userId } from "@/lib/auth";
import Link from "next/link";
import {Card} from "@/app/components/card";


export default function FavoriteQuotesPage (){

  const { myQuotes, handleLike } = useContext(QuotesContext);

  const likedQuotes =myQuotes?.filter(quote => quote.likedBy?.includes(userId));
  
  return (
    <main className="m-auto flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-17 px-17 bg-white dark:bg-black sm:items-start">
    {likedQuotes.map((quote, idx)=> {
       const isLiked = (quote.likedBy || []).includes(userId);
    
    return (
       <div key={`${quote.quote}-${idx}`} className="py-3 px-6 ">
          <Card variant="liked-card">
              <Button onClick = {()=> handleLike(quote)} label= {isLiked? "💔" : "❤️"} variant="icon" />
              <Quote label={`${quote.quote}`}/>
              <Autor label={`- ${quote.autor}`}/>   
          </Card>
      </div>
    )
})}
    {likedQuotes.length === 0 ? (<h1>No quotes were liked yet.Check quotes <Link href="/" >here</Link></h1>
    ) : (<></>)
  } 
    </main>
  );
}