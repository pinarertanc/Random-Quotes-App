import { auth0 } from "@/lib/auth0";
import { LockKeyIcon, SignInIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "User Profile | QuoteApp",
  description: "User profile and settings pages",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  // Giriş yapılmamışsa şık bir uyarı kartı göster
  if (!session) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 text-center bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <LockKeyIcon size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Authentication Required
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              Please log in to access your profile settings and favorite quotes.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/auth/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              <SignInIcon size={20} />
              <span>Log In</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Giriş yapılmışsa doğrudan çocuk bileşenleri göster
  return <>{children}</>;
}