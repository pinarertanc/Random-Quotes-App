// app/user/shelf/page.tsx (or your respective shelf page route)

import { auth0 } from "@/lib/auth0";
import { listBooksByReadingCategory } from "@/repositories/quotes";
import { ReadingStatus } from "@/types/quotes";
import { redirect } from "next/navigation";

export default async function ShelfPage() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    redirect("/api/auth/login");
  }

  // Fetch quotes for all three categories concurrently
  const [readQuotes, readingQuotes, wantToReadQuotes] = await Promise.all([
    listBooksByReadingCategory(userId, ReadingStatus.READ),
    listBooksByReadingCategory(userId, ReadingStatus.CURRENTLY_READING),
    listBooksByReadingCategory(userId, ReadingStatus.WANT_TO_READ),
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Book Shelf</h1>

      {/* 3-Column Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Currently Reading */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-blue-900">📖 Currently Reading</h2>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
              {readingQuotes.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {readingQuotes.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No quotes in this category yet.</p>
            ) : (
              readingQuotes.map((quote) => (
                <div key={quote.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm italic text-gray-800">"{quote.quote}"</p>
                  <p className="text-xs text-gray-500 font-medium mt-2">— {quote.author}, <span className="font-semibold">{quote.title}</span></p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 2: Want to Read */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-amber-900">📌 Want to Read</h2>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
              {wantToReadQuotes.length}
            </span>
          </div>

          <div className="space-y-3">
            {wantToReadQuotes.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No quotes in this category yet.</p>
            ) : (
              wantToReadQuotes.map((quote) => (
                <div key={quote.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm italic text-gray-800">"{quote.quote}"</p>
                  <p className="text-xs text-gray-500 font-medium mt-2">— {quote.author}, <span className="font-semibold">{quote.title}</span></p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 3: Read */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-emerald-900">✅ Read</h2>
            <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full">
              {readQuotes.length}
            </span>
          </div>

          <div className="space-y-3">
            {readQuotes.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No quotes in this category yet.</p>
            ) : (
              readQuotes.map((quote) => (
                <div key={quote.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm italic text-gray-800">"{quote.quote}"</p>
                  <p className="text-xs text-gray-500 font-medium mt-2">— {quote.author}, <span className="font-semibold">{quote.title}</span></p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}