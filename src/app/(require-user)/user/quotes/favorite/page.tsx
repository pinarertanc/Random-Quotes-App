
import Link from "next/link";
import { Quote } from "@/components/quote";
import { Author } from "@/components/author";
import { Card } from "@/components/card";
import { Button, ButtonVariant } from "@/components/ui/button";
import { ThumbsUpIcon, HeartBreakIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { auth0 } from "@/lib/auth0";
import { listFavouriteQuotes } from "@/repositories/quotes";
import { toggleLikeQuote } from "@/app/(require-user)/user/quotes/favorite/action";
import { redirect } from "next/navigation";


export default async function FavoriteQuotesPage() {

  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user?.sub;


  const likedQuotes = await listFavouriteQuotes(userId);

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6">

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Favorite Quotes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {likedQuotes?.length} quotes saved in your collection
          </p>
        </div>
      </div>

      {likedQuotes && likedQuotes.length > 0 ? (
        <div className="grid gap-4 w-full">
          {likedQuotes.map((quote, idx) => {
            const authorName = quote.author || (quote as any).autor;
            const authorLabel = authorName ? `- ${authorName}` : "";

            const handleUnlike = async () => {
              'use server';
              await toggleLikeQuote(quote.id, userId);
            }

            return (
              <div
                key={`${quote.id}-${idx}`}
                className="w-full transition-all duration-200 hover:-translate-y-0.5"
              >
                <Card variant="liked-card" className="p-6 relative group border border-border/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1 space-y-3 pr-2">
                      <Quote label={quote.quote} />
                      {authorLabel && (
                        <Author label={authorLabel} />
                      )}
                    </div>

                    <div className="flex items-center shrink-0 pt-1">
                      <form action={handleUnlike}>
                        <Button
                          variant={ButtonVariant.Ghost}
                          type="submit"
                          aria-label="Unlike quote"
                          className="rounded-full p-2.5 hover:bg-rose-500/10 transition-colors"
                        >
                          <ThumbsUpIcon
                            size={26}
                            weight="fill"
                            className="transition-transform active:scale-80 text-rose-500 dark:text-rose-400"
                          />
                        </Button>
                      </form>
                    </div>

                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-border/80 bg-muted/20">
          <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
            <HeartBreakIcon size={36} weight="duotone" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            No Favorite Quotes Yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            You haven't liked any quotes yet. Explore quotes on the main page and build your personal collection.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeftIcon size={18} />
            <span>Discover Quotes</span>
          </Link>
        </div>
      )}
    </main>
  );
}