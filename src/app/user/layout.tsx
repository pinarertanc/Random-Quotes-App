import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

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

  
  if (!session) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}