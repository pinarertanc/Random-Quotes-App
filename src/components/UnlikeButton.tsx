"use client";

import { useTransition } from "react";
import { ThumbsUpIcon } from "@phosphor-icons/react";
import { Button, ButtonVariant } from "@/components/ui/button";
import { toggleLikeQuote } from "@/app/(require-user)/user/quotes/favorite/action";

interface UnlikeButtonProps {
  quoteId: string;
}

export function UnlikeButton({ quoteId }: UnlikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={ButtonVariant.Ghost}
      aria-label="Unlike quote"
      disabled={isPending}
      onClick={() => startTransition(async () => { await toggleLikeQuote(quoteId); })}
      className="rounded-full p-2.5 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
    >
      <ThumbsUpIcon
        size={26}
        weight="fill"
        className="text-rose-500 dark:text-rose-400"
      />
    </Button>
  );
}