// app/user/settings/page.tsx
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";
import { listBooksByReadingCategory } from "@/repositories/quotes";
import { ReadingStatus } from "@/types/quotes";

export default async function UserSettingPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user || !user.sub) {
    redirect("/api/auth/login");
  }

  // 🟢 Raf istatistiklerini paralel (concurrent) olarak çekiyoruz
  const [readQuotes, readingQuotes, wantToReadQuotes] = await Promise.all([
    listBooksByReadingCategory(user.sub, ReadingStatus.READ),
    listBooksByReadingCategory(user.sub, ReadingStatus.CURRENTLY_READING),
    listBooksByReadingCategory(user.sub, ReadingStatus.WANT_TO_READ),
  ]);

  const stats = {
    readCount: readQuotes.length,
    readingCount: readingQuotes.length,
    wantToReadCount: wantToReadQuotes.length,
    totalQuotes: readQuotes.length + readingQuotes.length + wantToReadQuotes.length,
  };

  return (
    <main className="container mx-auto max-w-4xl min-h-[calc(100vh-80px)] p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm font-medium text-gray-700 mt-1">
          Manage your profile information and view your shelf activity summary.
        </p>
      </div>
      <ProfileCard user={user} stats={stats} />
    </main>
  );
}