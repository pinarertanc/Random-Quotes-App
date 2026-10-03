
import Image from "next/image";

export interface ShelfStats {
  readingCount: number;
  wantToReadCount: number;
  readCount: number;
  totalQuotes: number;
}

interface ProfileCardProps {
  user: {
    name?: string;
    nickname?: string;
    email?: string;
    picture?: string;
    email_verified?: boolean;
    sub?: string;
  };
  stats: ShelfStats;
}

export function ProfileCard({ user, stats }: ProfileCardProps) {
  const provider = user.sub?.split("|")[0] || "Auth0";

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      {/* 👤 ÜST KISIM: Profil Bilgileri */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* 🖼️ SOL: Profil Resmi ve Verified Rozeti */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name || "User Avatar"}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-2xl">
                {(user.name || user.email || "U")[0].toUpperCase()}
              </div>
            )}
          </div>

          {user.email_verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
              <svg className="w-3 h-3 fill-emerald-500" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* 📝 SAĞ: İsim, Email & Detaylar */}
        <div className="flex-1 w-full text-center sm:text-left space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {user.name || user.nickname || "User"}
              </h2>
              <span className="self-center sm:self-auto text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md capitalize">
                Via {provider}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{user.email || "No email provided"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
              <span className="text-gray-400 font-medium block mb-0.5">User Identifier</span>
              <span className="font-mono text-gray-700 truncate block" title={user.sub}>
                {user.sub || "—"}
              </span>
            </div>

            <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
              <span className="text-gray-400 font-medium block mb-0.5">Account Status</span>
              <span className="font-semibold text-slate-700">
                {user.email_verified ? "Active & Verified" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-gray-100" />

      {/* 📚 ALT KISIM: Shelf Status Summary */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>📚 Shelf Summary</span>
          <span className="text-xs font-normal text-gray-400">({stats.totalQuotes} total items)</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Currently Reading */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-center">
            <span className="text-lg mb-1 block">📖</span>
            <span className="text-lg font-bold text-blue-900 block">{stats.readingCount}</span>
            <span className="text-[11px] text-blue-700 font-medium">Reading</span>
          </div>

          {/* Want to Read */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 text-center">
            <span className="text-lg mb-1 block">📌</span>
            <span className="text-lg font-bold text-amber-900 block">{stats.wantToReadCount}</span>
            <span className="text-[11px] text-amber-700 font-medium">Want to Read</span>
          </div>

          {/* Read */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-center">
            <span className="text-lg mb-1 block">✅</span>
            <span className="text-lg font-bold text-emerald-900 block">{stats.readCount}</span>
            <span className="text-[11px] text-emerald-700 font-medium">Read</span>
          </div>
        </div>
      </div>

    </div>
  );
}