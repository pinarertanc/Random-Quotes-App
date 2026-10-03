
import { auth0 } from "@/lib/auth0";
import { listBooksByReadingCategory } from "@/repositories/quotes";
import { ReadingStatus } from "@/types/quotes";
import { ShelfColumn } from "@/components/shelf"; // 🟢 ShelfColumn import edildi

export default async function ShelfPage() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  // Fetch quotes for all three categories concurrently
  const [readQuotes, readingQuotes, wantToReadQuotes] = await Promise.all([
    listBooksByReadingCategory(userId, ReadingStatus.READ),
    listBooksByReadingCategory(userId, ReadingStatus.CURRENTLY_READING),
    listBooksByReadingCategory(userId, ReadingStatus.WANT_TO_READ),
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Book Shelf</h1>

      {/* 3-Column Responsive Grid Layout using components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ShelfColumn
          title="Read"
          icon="✅"
          quotes={readQuotes}
          variant="emerald"
        />
        <ShelfColumn
          title="Currently Reading"
          icon="📖"
          quotes={readingQuotes}
          variant="blue"
        />
       
        <ShelfColumn
          title="Want to Read"
          icon="📌"
          quotes={wantToReadQuotes}
          variant="amber"
        />

      </div>
    </div>
  );
}