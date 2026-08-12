'use client';

import { useContext } from 'react';
import { ThumbsUpIcon } from '@phosphor-icons/react';
import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button';
import { Autor } from '@/app/components/autor';
import { Quote } from '@/app/components/quote';
import { Card } from '@/app/components/card';
import { QuotesContext } from '@/app/context/QuotesContext';



export default function Home() {
  const { myQuotes = [], index = 0, handleLike, handleNextClick, handlePrevClick } = useContext(QuotesContext) || {};

  const currentQuote = myQuotes?.[index];
  const isLikedQuote = (currentQuote?.likedBy || []).includes('UserId');

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 sm:p-8 bg-background text-foreground">
      <Card className="flex w-full max-w-xl flex-col gap-14 p-6 sm:p-8">
     
          <Button onClick={()=> currentQuote && handleLike(currentQuote)} variant={ButtonVariant.Ghost} type="button" aria-label={isLikedQuote ? "Beğeniyi kaldır" : "Alıntıyı beğen"}>
            <ThumbsUpIcon 
            size={32} 
            weight={isLikedQuote ? "fill" : "regular"} 
            color={isLikedQuote ? "var(--chart-2)" : "currentColor"}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
          </Button>

          <Quote label={currentQuote?.quote || ''} />
          <Autor label={currentQuote?.autor ? `- ${currentQuote.autor}` : ''} />
        

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={handlePrevClick} disabled={index === 0} size={ButtonSize.Sm} className="w-full sm:w-auto">
            Previous Quote
          </Button>
          <Button
            onClick={handleNextClick}
            disabled={index === (myQuotes.length ? myQuotes.length - 1 : 0)}
            size={ButtonSize.Sm}
            className="w-full sm:w-auto"
          >
            Next Quote
          </Button>
        </div>
      </Card>
    </main>
  );
}