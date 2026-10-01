
"use client";

import { useState, useEffect } from "react";
import { myQuotesProps } from "@/types/quotes";
import { fetchBookCover } from "@/lib/googleBooks";

interface BookCardProps {
  quote: myQuotesProps;
}

export function BookCard({ quote }: BookCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Eğer quote.coverUrl veritabanında zaten varsa doğrudan kullan, yoksa API'den ara
    if ((quote as any).coverUrl) {
      setCoverUrl((quote as any).coverUrl);
      setLoading(false);
    } else {
      fetchBookCover(quote.title, quote.author).then((url) => {
        setCoverUrl(url);
        setLoading(false);
      });
    }
  }, [quote.title, quote.author]);

  return (
    <div className="flex gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* 🖼️ Kitap Kapağı */}
      <div className="relative w-16 h-24 flex-shrink-0 bg-slate-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
        {loading ? (
          <div className="animate-pulse bg-gray-200 w-full h-full" />
        ) : coverUrl ? (
          <img
            src={coverUrl}
            alt={quote.title}
            className="w-full h-full object-cover"
          />
        ) : (
          // Kapak bulunamazsa gösterilecek şık varsayılan görünüm
          <div className="text-center p-2 text-gray-400 flex flex-col items-center justify-center h-full">
            <span className="text-xl">📚</span>
            <span className="text-[10px] font-semibold text-gray-500 line-clamp-2 mt-1 leading-tight">
              {quote.title}
            </span>
          </div>
        )}
      </div>

      {/* 📝 Kitap & Alıntı Bilgileri */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 truncate" title={quote.title}>
            {quote.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">
            {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}