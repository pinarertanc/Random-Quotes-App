'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, ButtonVariant, ButtonSize } from "@/app/components/ui/button";
import { House, Heart, Plus, Gear, SignOut, SignIn, List, X } from "@phosphor-icons/react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const hasSession = Boolean(user);

  if (isLoading) {
    return (
      <nav className="relative z-50 bg-background/80 backdrop-blur-md border-b w-full h-16 flex items-center px-4 sm:px-8">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            QuoteApp
          </span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 w-full transition-all">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto h-16 px-4 sm:px-8">
        
        {/* Sol Taraf: Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
          QuoteApp
        </Link>

        {hasSession ? (
          <>
            {/* Masaüstü Navigasyon Linkleri */}
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <Link 
                href="/" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <House size={20} />
                <span>Home</span>
              </Link>

              <Link 
                href="/user/quotes/favorite" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Heart size={20} className="text-rose-500" />
                <span>My Favorites</span>
              </Link>

              <Link 
                href="/quotes/new" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Plus size={20} />
                <span>Add Quote</span>
              </Link>
            </div>

            {/* Masaüstü Profil ve Eylemler */}
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/user/settings" title="Settings">
                <Button variant={ButtonVariant.Ghost} size={ButtonSize.Icon} className="rounded-full">
                  <Gear size={22} className="text-muted-foreground hover:text-foreground transition-colors" />
                </Button>
              </Link>

              <div className="h-5 w-px bg-border" />

              {user?.picture && (
                <Image
                  className="rounded-full ring-2 ring-primary/20 object-cover"
                  src={user.picture}
                  alt={user.name || "Profile picture"}
                  width={36}
                  height={36}
                  priority
                />
              )}

              <Button asChild variant={ButtonVariant.Outline} size={ButtonSize.Sm} className="gap-2">
                <a href="/auth/logout">
                  <SignOut size={16} />
                  <span>Log Out</span>
                </a>
              </Button>
            </div>

            {/* Mobil Menü Butonu */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={26} /> : <List size={26} />}
              </button>
            </div>

            {/* Mobil Açılır Menü */}
            {isOpen && (
              <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b shadow-xl flex flex-col gap-2 p-4 sm:hidden animate-in slide-in-from-top-2 duration-200">
                {/* Mobil Kullanıcı Kartı */}
                <div className="flex items-center gap-3 px-3 py-2 border-b border-border/50 pb-3 mb-1">
                  {user?.picture && (
                    <Image
                      className="rounded-full object-cover"
                      src={user.picture}
                      alt="profile picture"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user?.name || user?.nickname}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <House size={20} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/user/quotes/favorite"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Heart size={20} className="text-rose-500" />
                  <span>My Favorites</span>
                </Link>

                <Link
                  href="/quotes/new"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Plus size={20} />
                  <span>Add New Quote</span>
                </Link>

                <Link
                  href="/user/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Gear size={20} />
                  <span>Settings</span>
                </Link>

                <hr className="my-1 border-border" />

                <a
                  href="/auth/logout"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors"
                >
                  <SignOut size={18} />
                  <span>Log Out</span>
                </a>
              </div>
            )}
          </>
        ) : (
          /* Giriş Yapılmamış Durum */
          <div className="flex items-center gap-3">
            <Button asChild size={ButtonSize.Sm} className="gap-2">
              <a href="/auth/login">
                <SignIn size={18} />
                <span>Log In</span>
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}