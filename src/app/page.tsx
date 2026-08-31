'use client';

import { useContext } from 'react';
import { ThumbsUpIcon, CaretLeftIcon, CaretRightIcon, QuotesIcon } from '@phosphor-icons/react';
import { Button, ButtonSize, ButtonVariant } from '@/app/components/ui/button';
import { Author } from '@/app/components/author';
import { Quote } from '@/app/components/quote';
import { Card } from '@/app/components/card';
import { QuotesContext } from '@/app/(context)/QuotesContext';
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  // 1. Tüm state ve fonksiyonlar doğrudan senin Context'inden çekiliyor
  const { 
    myQuotes = [], 
    index = 0, 
    handleLike, 
    handleNextClick, 
    handlePrevClick 
  } = useContext(QuotesContext) || {};

  const { user } = useUser();
  const userId = user?.sub;

  // 2. O anki quote Context'teki index'e göre belirleniyor
  const currentQuote = myQuotes[index];
  const isLikedQuote = (currentQuote?.likedBy || []).includes(userId);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-background text-foreground">
      <Card className="relative flex w-full max-w-2xl flex-col justify-between p-6 sm:p-10 border border-border/80 shadow-lg min-h-[380px]">
        
        {/* Üst Kısım: Dekoratif İkon & Sağ Üst Beğeni Butonu */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="text-primary/30">
            <QuotesIcon size={40} weight="fill" />
          </div>

          <Button 
            onClick={() => currentQuote && handleLike?.(currentQuote)} 
            variant={ButtonVariant.Ghost} 
            type="button" 
            aria-label={isLikedQuote ? "Unlike quote" : "Like quote"}
            className="rounded-full p-2.5 hover:bg-rose-500/10 transition-colors"
          >
            <ThumbsUpIcon
              size={28}
              weight={isLikedQuote ? "fill" : "regular"}
              className={`transition-all active:scale-80 ${
                isLikedQuote
                  ? "text-rose-500 dark:text-rose-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Orta Kısım: Alıntı ve Yazar */}
        <div className="flex flex-col items-center text-center my-auto py-6 space-y-4">
          <Quote label={currentQuote?.quote || ''} />
          {currentQuote?.author && (
            <Author label={`- ${currentQuote.author}`} />
          )}
        </div>

        {/* Alt Kısım: Context'ten Gelen Gezinme Butonları */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
            {myQuotes.length > 0 ? `${index + 1} / ${myQuotes.length}` : '0 / 0'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
            <Button 
              onClick={handlePrevClick} 
              disabled={index === 0} 
              size={ButtonSize.Sm} 
              variant={ButtonVariant.Outline}
              className="flex-1 sm:flex-initial gap-1.5"
            >
              <CaretLeftIcon size={16} />
              <span>Previous</span>
            </Button>
            
            <Button
              onClick={handleNextClick}
              disabled={index === (myQuotes.length ? myQuotes.length - 1 : 0)}
              size={ButtonSize.Sm}
              className="flex-1 sm:flex-initial gap-1.5"
            >
              <span>Next</span>
              <CaretRightIcon size={16} />
            </Button>
          </div>
        </div>

      </Card>
    </main>
  );
}