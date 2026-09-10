'use client';

import { useState, useTransition } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { 
  ThumbsUpIcon, 
  CaretLeftIcon, 
  CaretRightIcon, 
  QuotesIcon, 
  TrashIcon,
  LockKeyIcon,
  SignInIcon,
  XIcon
} from '@phosphor-icons/react';

import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button';
import { Author } from '@/components/author';
import { Quote } from '@/components/quote';
import { Card } from '@/components/card';
import { HomeProps } from '@/types/clientComponent';
import { myQuotesProps } from '@/types/quotes';

import { deleteQuote } from './(require-user)/quotes/action';
import { toggleLikeQuote } from './(require-user)/user/quotes/favorite/action';

export default function Home({ initialQuotes, userId }: HomeProps) {
  const { user } = useUser();
  const [index, setIndex] = useState<number>(0);
  const [myQuotes, setMyQuotes] = useState<myQuotesProps[]>(initialQuotes);
  const [isPending, startTransition] = useTransition();

  const [showAuthRequired, setShowAuthRequired] = useState(false);

  const handleNextClick = () => {
    if (index < myQuotes.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleLike = (targetQuote: myQuotesProps) => {
    
    if (!user) {
      setShowAuthRequired(true);
      return;
    }

    const currentUserId = user.sub;

    setMyQuotes((prevQuotes) =>
      prevQuotes.map((item) => {
        if (item.id !== targetQuote.id && targetQuote.quote !== item.quote) return item;

        const currentLikedBy = item.likedBy || [];
        const alreadyLiked = currentLikedBy.includes(currentUserId);

        const updatedLikedBy = alreadyLiked
          ? currentLikedBy.filter((id) => id !== currentUserId)
          : [...currentLikedBy, currentUserId];

        return {
          ...item,
          likedBy: updatedLikedBy
        };
      })
    );

    startTransition(async () => {
      await toggleLikeQuote(targetQuote.id, userId);
    });
  }; 

  const handleDelete = (quoteId: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      startTransition(async () => {
        await deleteQuote(quoteId);
      });
    }
  };

  
  if (showAuthRequired) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-background text-foreground">
        <div className="relative w-full max-w-md space-y-6 text-center bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm">
          
          
          <button
            onClick={() => setShowAuthRequired(false)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
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

  const currentQuote = myQuotes[index];
  const activeUserId = userId || user?.sub;
  const isLikedQuote = activeUserId && currentQuote?.likedBy 
    ? currentQuote.likedBy.includes(activeUserId) 
    : false;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 sm:p-8 bg-background text-foreground">
      <Card className="relative flex w-full max-w-2xl flex-col justify-between p-6 sm:p-10 border border-border/80 shadow-lg min-h-[380px]">

        <div className="flex items-center justify-between w-full mb-4">
          <div className="text-primary/30">
            <QuotesIcon size={40} weight="fill" />
          </div>

          <Button
            onClick={() => currentQuote && handleLike(currentQuote)}
            variant={ButtonVariant.Ghost}
            type="button"
            disabled={isPending}
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

        <div className="flex flex-col items-center text-center my-auto py-6 space-y-4">
          <Quote label={currentQuote?.quote || ''} />
          {currentQuote?.author && (
            <Author label={`- ${currentQuote.author}`} />
          )}
        </div>

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

            {currentQuote && activeUserId === currentQuote.createdBy && (
              <Button
                variant={ButtonVariant.Destructive}
                disabled={isPending}
                onClick={() => handleDelete(currentQuote.id)}
              >
                <TrashIcon size={20} />
              </Button>
            )}
          </div>
        </div>

      </Card>
    </main>
  );
}