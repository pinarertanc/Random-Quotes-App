'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0';
import {
  CaretLeftIcon,
  CaretRightIcon,
  QuotesIcon,
  LockKeyIcon,
  SignInIcon,
  XIcon
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

  const [showAuthRequired, setShowAuthRequired] = useState(false);
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
      setShowAuthRequired(true);
      return;
    }

    startTransition(async () => {
      await toggleLikeQuote(quoteId);
      router.refresh();
    });
  };

  const handleDelete = async (quoteId: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      startTransition(async () => {
        const res = await deleteQuote(quoteId);

        if (res?.success) {
          if (index >= initialQuotes.length - 1 && index > 0) {
            setIndex((prev) => prev - 1);
          }
          router.refresh();
        }
      });
    }
  };

  if (showAuthRequired) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-transparent text-foreground">
        <div className="relative w-full max-w-md space-y-6 text-center bg-white/10 dark:bg-black/20 p-8 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setShowAuthRequired(false)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-900/30">
            <LockKeyIcon size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Authentication Required
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              Please log in to access your profile settings and favorite quotes.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/auth/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              <SignInIcon size={20} />
              <span>Log In</span>
            </a>

            <button
              type="button"
              onClick={() => setShowAuthRequired(false)}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 pt-2 transition-colors"
            >
              Go back to quotes
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-transparent text-foreground">
      {/* Tüm içeriği ortalayan ve max genişlik veren kapsayıcı */}
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-center">

        {/* Üst İkon Alanı */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="text-primary/40">
            <QuotesIcon size={40} weight="fill" />
          </div>
        </div>

        {/* Söz Kartı Alanı */}
        {currentQuote ? (
          <div className="w-full my-2">
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
          {/* Sayaç daha belirgin hale getirildi */}
          <span className="text-sm text-foreground font-semibold order-2 sm:order-1">
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