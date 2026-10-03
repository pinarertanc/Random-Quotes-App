import { QuoteCard } from "@/components/quote-card";
import { getAddedQuotesAction } from "./action";
import { toggleLikeQuote } from "@/app/(require-user)/user/quotes/favorite/action";
import Link from "next/link";
import { HeartBreakIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { deleteQuote } from "@/app/(require-user)/quotes/action";
import { auth0 } from "@/lib/auth0";

export default async function AddedQuotesPage() {

  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  const addedQuotes = await getAddedQuotesAction();

  async function handleToggleLike(quoteId: string) {
    "use server";
    await toggleLikeQuote(quoteId);
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Added Quotes
          </h1>
          <p className="inline-flex items-center text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-black/40 px-3 py-1 rounded-full border border-white/40 dark:border-white/10 backdrop-blur-sm shadow-xs mt-2">
            {addedQuotes?.length || 0} quotes added in your collection
          </p>
        </div>
      </div>

      {addedQuotes && addedQuotes.length > 0 ? (
        <div className="grid gap-4 w-full">
          {addedQuotes.map((quote, idx) => (
            <div
              key={`${quote.id}-${idx}`}
              className="w-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <QuoteCard
                quote={quote}
                currentUserId={userId}
                onDelete={deleteQuote}  
                onToggleLike={handleToggleLike}
                editHref={`/quotes/${quote.id}/edit`} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-border/80 bg-muted/20">
          <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
            <HeartBreakIcon size={36} weight="duotone" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            No Added Quotes Yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            You haven't added any quotes yet. Explore "add quote" page and build your personal collection.
          </p>
          <Link
            href="/quotes/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeftIcon size={18} />
            <span>Add Quotes</span>
          </Link>
        </div>
      )}


    </main>

  )

}