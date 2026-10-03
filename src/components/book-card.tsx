// components/shelf/book-card.tsx
"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Image from "next/image";
import { myQuotesProps } from "@/types/quotes";
import { ReadingStatus } from "@/types/quotes";
import { fetchBookCover } from "@/lib/googleBooks";
import { updateQuoteCategory } from "@/app/(require-user)/user/shelf/action";

interface BookCardProps {
  quote: myQuotesProps;
}

export function BookCard({ quote }: BookCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch book cover
  useEffect(() => {
    fetchBookCover(quote.title, quote.author)
      .then((url) => setCoverUrl(url))
      .finally(() => setLoading(false));
  }, [quote.title, quote.author]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle category update
  const handleCategorySelect = (newCategory: ReadingStatus) => {
    setIsMenuOpen(false);
    if (newCategory === quote.category) return;

    startTransition(async () => {
      await updateQuoteCategory(quote.id, newCategory);
    });
  };

  return (
    <div className={`relative flex gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${isPending ? "opacity-40 pointer-events-none" : ""}`}>
      {/* 🖼️ Book Cover */}
      <div className="relative w-16 h-24 flex-shrink-0 bg-slate-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
        {loading ? (
          <div className="animate-pulse bg-gray-200 w-full h-full" />
        ) : coverUrl ? (
          <Image
            src={coverUrl}
            alt={quote.title}
            fill
            sizes="64px"
            className="object-cover"
            onError={() => setCoverUrl(null)}
          />
        ) : (
          <div className="text-center p-2 text-gray-400">
            <span className="text-xl">📚</span>
            <p className="text-[10px] font-semibold text-gray-500 line-clamp-2 mt-1">
              {quote.title}
            </p>
          </div>
        )}
      </div>

      {/* 📝 Book Info & Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0 pr-6">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 truncate" title={quote.title}>
            {quote.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
            {quote.author}
          </p>
        </div>

        <p className="text-xs text-gray-600 italic line-clamp-2 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
          "{quote.quote}"
        </p>
      </div>

      {/* ⚙️ Three-Dots Menu Button & Dropdown */}
      <div className="absolute top-3 right-2" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Move to another shelf"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {/* Floating Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 text-xs">
            <div className="px-3 py-1.5 font-semibold text-gray-400 border-b border-gray-50">
              Move to...
            </div>

            <button
              onClick={() => handleCategorySelect(ReadingStatus.CURRENTLY_READING)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50 hover:text-blue-600 ${
                quote.category === ReadingStatus.CURRENTLY_READING ? "text-blue-600 font-semibold bg-blue-50/50" : "text-gray-700"
              }`}
            >
              <span>📖 Currently Reading</span>
              {quote.category === ReadingStatus.CURRENTLY_READING && <span>✓</span>}
            </button>

            <button
              onClick={() => handleCategorySelect(ReadingStatus.WANT_TO_READ)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-amber-50 hover:text-amber-600 ${
                quote.category === ReadingStatus.WANT_TO_READ ? "text-amber-600 font-semibold bg-amber-50/50" : "text-gray-700"
              }`}
            >
              <span>📌 Want to Read</span>
              {quote.category === ReadingStatus.WANT_TO_READ && <span>✓</span>}
            </button>

            <button
              onClick={() => handleCategorySelect(ReadingStatus.READ)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-600 ${
                quote.category === ReadingStatus.READ ? "text-emerald-600 font-semibold bg-emerald-50/50" : "text-gray-700"
              }`}
            >
              <span>✅ Read</span>
              {quote.category === ReadingStatus.READ && <span>✓</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}