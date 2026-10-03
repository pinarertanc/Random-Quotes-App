// components/shelf/shelf-column.tsx

import { myQuotesProps } from "@/types/quotes";
import { BookCard } from "./book-card"; // 🟢 Yeni BookCard bileşenimizi çağırıyoruz

interface ShelfColumnProps {
  title: string;
  icon: string;
  quotes: myQuotesProps[];
  variant?: "blue" | "amber" | "emerald";
}

const variantStyles = {
  blue: {
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    text: "text-blue-900",
    badge: "bg-blue-200 text-blue-800",
  },
  amber: {
    bg: "bg-amber-50/50",
    border: "border-amber-100",
    text: "text-amber-900",
    badge: "bg-amber-200 text-amber-800",
  },
  emerald: {
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    text: "text-emerald-900",
    badge: "bg-emerald-200 text-emerald-800",
  },
};

export function ShelfColumn({
  title,
  icon,
  quotes,
  variant = "blue",
}: ShelfColumnProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} p-4 rounded-xl border ${styles.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-semibold ${styles.text}`}>
          {icon} {title}
        </h2>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles.badge}`}>
          {quotes.length}
        </span>
      </div>

      <div className="space-y-3">
        {quotes.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No quotes in this category yet.
          </p>
        ) : (
          quotes.map((quote) => (
            <BookCard key={quote.id} quote={quote} />
          ))
        )}
      </div>
    </div>
  );
}