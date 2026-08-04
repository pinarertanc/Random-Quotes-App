'use client';
import {useContext} from 'react';
import {Button} from '@/app/components/button';
import {Autor} from '@/app/components/autor';
import {Quote} from '@/app/components/quote';
import {Card} from '@/app/components/card';
import { QuotesContext } from '@/app/context/QuotesContext';
import { userId } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function Home() {
 
  const {myQuotes,index,handleLike,handleNextClick,handlePrevClick} = useContext(QuotesContext) || {};

  const isLikedQuote = ()=>{
    const currentQuote = myQuotes?.[index];
    return(currentQuote?.likedBy || []).includes(userId);
  }

  return (
    
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-70 px-26 dark:bg-black sm:items-start">
        <Card>
        <div className="h-32 ">
          <Button onClick = {handleLike}label= {isLikedQuote () ? "💔" : "❤️"} variant="icon" />
          <Quote label={`${myQuotes[index].quote}`}/>
          <Autor label={`- ${myQuotes[index].autor}`}/>
        </div>
        <div className="flex gap-3">
        <Button onClick={handlePrevClick} label={"Previous Quote"} disabled={index===0} />
        <Button onClick = {handleNextClick} label={'Next Quote'} disabled={index===myQuotes.length-1}/>
       </div>      
       </Card>
        
      </main>
    </div>
  );
}
