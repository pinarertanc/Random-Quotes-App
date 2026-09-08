import Link from 'next/link';
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function NewQuoteSuccessPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-xl mx-auto text-center bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-sm transition-all">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircleIcon size={44} weight="duotone" />
        </div>


        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          New Quote Added Successfully!
        </h1>


        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
          Your quote has been saved. Add another quote or return to the main page.
        </p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            href="/quotes/new"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
          >
            Add Another Quote
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-border bg-background text-foreground hover:bg-muted font-medium text-sm active:scale-95 transition-all"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </main>
  );
}