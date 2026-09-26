"use client";

import { Quote } from "@/components/quote";
import { Author } from "@/components/author";
import { Card } from "@/components/card"; 
import { Button, ButtonVariant } from "@/components/ui/button";
import { ThumbsUpIcon, TrashIcon } from "@phosphor-icons/react";
import { useTransition } from "react";
import { myQuotesProps } from "@/types/quotes";

interface QuoteCardProps {
  quote: myQuotesProps;
  isLiked?: boolean;
  currentUserId?: string;
  onToggleLike?: (quoteId: string) => Promise<void>;
  onDelete?: (quoteId: string) => Promise<void>;
}

export function QuoteCard({
  quote,
  isLiked = false,
  currentUserId,
  onToggleLike,
  onDelete,
}: QuoteCardProps) {
  const [isPending, startTransition] = useTransition();

  const authorName = quote.author || quote.author;
  const authorLabel = authorName ? `- ${authorName}` : "";
  const isOwner = currentUserId && quote.createdBy === currentUserId;

  return (
    // 🟢 Senin mevcut Card bileşenini dış çerçeve olarak kullanıyoruz:
    <Card variant={isLiked ? "liked-card" : "primary"}>
      <div className="flex items-start justify-between gap-4 h-full">
        {/* Söz ve Yazar */}
        <div className="flex-1 space-y-3">
          <Quote label={quote.quote} />
          {authorLabel && <Author label={authorLabel} />}
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-2 shrink-0">
          {onToggleLike && (
            <Button
              variant={ButtonVariant.Ghost}
              aria-label="Toggle like"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onToggleLike(quote.id);
                })
              }
              className="rounded-full p-2.5 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
            >
              <ThumbsUpIcon
                size={24}
                weight={isLiked ? "fill" : "regular"}
                className={
                  isLiked
                    ? "text-rose-500 dark:text-rose-400"
                    : "text-muted-foreground hover:text-foreground"
                }
              />
            </Button>
          )}

          {isOwner && onDelete && (
            <Button
              variant={ButtonVariant.Ghost}
              aria-label="Delete quote"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onDelete(quote.id);
                })
              }
              className="rounded-full p-2.5 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <TrashIcon size={22} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}