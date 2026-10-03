"use client";

import Link from "next/link";
import { Quote } from "@/components/quote";
import { Author } from "@/components/author";
import { Button, ButtonVariant } from "@/components/ui/button";
import { HeartIcon, TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import { useTransition } from "react";
import { QuoteCardProps } from "@/types/quotes-document";

export function QuoteCard({
  quote,
  isLiked = false,
  currentUserId,
  editHref,
  onToggleLike,
  onDelete,
}: QuoteCardProps) {
  const [isPending, startTransition] = useTransition();

  const authorName = quote.author;
  const bookTitle = quote.title;

  // Opsiyonel güvenlik kontrolü: Eğer userId verilmişse eşleşmeye bakar, verilmemişse prop'ların varlığına güvenir.
  const isOwner = currentUserId ? quote.addedBy === currentUserId : true;

  return (
    <div className="relative p-5 sm:p-6 rounded-2xl border bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 shadow-xl backdrop-blur-md transition-all min-h-[180px] flex flex-col items-center justify-center">
      
      {/* 🟢 Sağ Üst: Beğeni (Kalp) Butonu */}
      {onToggleLike && (
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant={ButtonVariant.Ghost}
            aria-label="Toggle like"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await onToggleLike(quote.id);
              })
            }
            className="rounded-full p-2 bg-black/5 dark:bg-white/10 hover:bg-rose-500/20 transition-colors disabled:opacity-50"
          >
            <HeartIcon
              size={20}
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

      {/* 🟢 ORTA KISIM: Alıntı + Yazar/Kitap */}
      <div className="flex flex-col items-center justify-center text-center gap-2.5 w-full max-w-lg px-6 my-auto">
        
        {/* 1. Alıntı Metni */}
        <div className="text-center">
          <Quote label={quote.quote} />
        </div>

        {/* 2. Yazar ve Kitap Adı */}
        {(authorName || bookTitle) && (
          <div className="flex items-center justify-center gap-2 flex-wrap text-center mt-1">
            {authorName && <Author label={`- ${authorName}`} />}
            {authorName && bookTitle && (
              <span className="text-foreground opacity-60">•</span>
            )}
            {bookTitle && (
              <span className="text-sm italic font-medium text-foreground">
                {bookTitle}
              </span>
            )}
          </div>
        )}

      </div>

      {/* 🟢 Sağ Alt: Aksiyon Butonları (Edit & Delete) */}
      {isOwner && (editHref || onDelete) && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1">
          
          {/* Edit Butonu (Sadece editHref verildiyse görünür) */}
          {editHref && (
            <Link
              href={editHref}
              className="rounded-full p-2 bg-black/5 dark:bg-white/10 hover:bg-blue-500/20 text-foreground hover:text-blue-500 transition-colors inline-flex items-center justify-center"
              aria-label="Edit quote"
            >
              <PencilSimpleIcon size={20} />
            </Link>
          )}

          {/* Delete Butonu (Sadece onDelete verildiyse görünür) */}
          {onDelete && (
            <Button
              variant={ButtonVariant.Ghost}
              aria-label="Delete quote"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onDelete(quote.id);
                })
              }
              className="rounded-full p-2 bg-black/5 dark:bg-white/10 hover:bg-red-500/20 text-foreground hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <TrashIcon size={20} />
            </Button>
          )}

        </div>
      )}

    </div>
  );
}