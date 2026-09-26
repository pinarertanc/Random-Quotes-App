'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0';
import { 
  CaretLeftIcon, 
  CaretRightIcon, 
  QuotesIcon 
} from '@phosphor-icons/react';

import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button';
import { HomeProps } from '@/types/clientComponent';
import { QuoteCard } from '@/components/quote-card';

import { deleteQuote } from './(require-user)/quotes/action';
import { toggleLikeQuote } from './(require-user)/user/quotes/favorite/action';

export default function Home({ initialQuotes }: HomeProps) {
  const router = useRouter();
  const { user } = useUser();
  const [index, setIndex] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // 🟢 Artık myQuotes yok, doğrudan MongoDB'den gelen initialQuotes kullanılıyor
  const activeUserId = user?.sub;
  const currentQuote = initialQuotes[index];
  const isLikedQuote = Boolean(
    activeUserId && currentQuote?.likedBy?.includes(activeUserId)
  );

  const handleNextClick = () => {
    if (index < initialQuotes.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleLike = async (quoteId: string) => {
    if (!user) {
      alert("Please log in to like the quotes!");
      window.location.href = "/auth/login";
      return;
    }

    startTransition(async () => {
      await toggleLikeQuote(quoteId);
      // 🟢 Veritabanı değiştiği için sunucudan taze veriyi çekiyoruz
      router.refresh();
    });
  }; 

  const handleDelete = async (quoteId: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      startTransition(async () => {
        const res = await deleteQuote(quoteId);

        if (res?.success) {
          // 🟢 Eğer silinen eleman son elemansa index'i bir geriye çekiyoruz
          if (index >= initialQuotes.length - 1 && index > 0) {
            setIndex((prev) => prev - 1);
          }
          // 🟢 MongoDB'deki silinmeyi arayüze yansıtmak için taze veriyi çekiyoruz
          router.refresh();
        }
      });
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-background text-foreground">
      <div className="relative flex w-full max-w-2xl flex-col justify-between p-4 sm:p-6 min-h-[380px]">

        {/* Üst Kısım: Alıntı İkonu */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="text-primary/30">
            <QuotesIcon size={40} weight="fill" />
          </div>
        </div>

        {/* Söz Kartı */}
        {currentQuote ? (
          <div className="my-auto">
            <QuoteCard
              quote={currentQuote}
              isLiked={isLikedQuote}
              currentUserId={activeUserId}
              onToggleLike={() => handleLike(currentQuote.id)}
              onDelete={() => handleDelete(currentQuote.id)}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No quotes available.
          </div>
        )}

        {/* Alt Kısım: Gezinti (Navigasyon) Butonları */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <span className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
            {initialQuotes.length > 0 ? `${index + 1} / ${initialQuotes.length}` : '0 / 0'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
            <Button
              onClick={handlePrevClick}
              disabled={index === 0 || isPending}
              size={ButtonSize.Sm}
              variant={ButtonVariant.Outline}
              className="flex-1 sm:flex-initial gap-1.5"
            >
              <CaretLeftIcon size={16} />
              <span>Previous</span>
            </Button>

            <Button
              onClick={handleNextClick}
              disabled={index === (initialQuotes.length ? initialQuotes.length - 1 : 0) || isPending}
              size={ButtonSize.Sm}
              className="flex-1 sm:flex-initial gap-1.5"
            >
              <span>Next</span>
              <CaretRightIcon size={16} />
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}