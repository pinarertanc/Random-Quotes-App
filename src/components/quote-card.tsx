"use client";

import { Quote } from "@/components/quote";
import { Author } from "@/components/author";
import { Button, ButtonVariant } from "@/components/ui/button";
import { HeartIcon, TrashIcon } from "@phosphor-icons/react";
import { useTransition } from "react";
import { QuoteCardProps } from "@/types/quotes-document";


export function QuoteCard({
  quote,
  isLiked = false,
  currentUserId,
  onToggleLike,
  onDelete,
}: QuoteCardProps) {
  const [isPending, startTransition] = useTransition();

  const authorName = quote.author;
  const bookTitle = quote.title; // QuoteProps/myQuotesProps içindeki title alanı

  // Yazar ve Kitap adını birlikte şık bir formatta gösterelim (Örn: "- Yazar, Kitap Adı" veya sadece "Kitap Adı")
  let authorLabel = "";
  if (authorName && bookTitle) {
    authorLabel = `- ${authorName}, ${bookTitle}`;
  } else if (authorName) {
    authorLabel = `- ${authorName}`;
  } else if (bookTitle) {
    authorLabel = `- ${bookTitle}`;
  }

  const isOwner = currentUserId && quote.addedBy === currentUserId;

  return (
    <div className="p-6 rounded-2xl border bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between gap-6">
      
      {/* Üst Kısım: Söz ve Kalp Butonu */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Quote label={quote.quote} />
        </div>

        {/* Kalp Butonu (Sağ Üst) */}
        {onToggleLike && (
          <div className="shrink-0">
            <Button
              variant={ButtonVariant.Ghost}
              aria-label="Toggle like"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onToggleLike(quote.id);
                })
              }
              className="rounded-full p-2.5 bg-black/5 dark:bg-white/10 hover:bg-rose-500/20 transition-colors disabled:opacity-50"
            >
              <HeartIcon
                size={24}
                weight={isLiked ? "fill" : "regular"}
                className={
                  isLiked
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-foreground hover:text-rose-500"
                }
              />
            </Button>
          </div>
        )}
      </div>

      {/* Alt Kısım: Yazar/Kitap ve Silme Butonu (Sağ Alt) */}
<div className="flex items-end justify-between gap-4">
  <div className="flex-1 space-y-1">
    {authorName && <Author label={`- ${authorName}`} />}
    {bookTitle && (
      <p className="text-sm italic text-muted-foreground">
        {bookTitle}
      </p>
    )}
  </div>

        {/* Silme Butonu (Sağ Alt Köşe) */}
        {isOwner && onDelete && (
          <div className="shrink-0">
            <Button
              variant={ButtonVariant.Ghost}
              aria-label="Delete quote"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onDelete(quote.id);
                })
              }
              className="rounded-full p-2.5 bg-black/5 dark:bg-white/10 hover:bg-red-500/20 text-foreground hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <TrashIcon size={22} />
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}