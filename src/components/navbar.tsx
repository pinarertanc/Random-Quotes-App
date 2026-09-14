'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, ButtonVariant, ButtonSize } from "@/components/ui/button";
import { 
  HouseIcon, 
  HeartIcon, 
  PlusIcon, 
  GearIcon, 
  SignOutIcon, 
  SignInIcon, 
  ListIcon, 
  XIcon, 
  CaretDownIcon, 
  BookmarkSimpleIcon,
  ScrollIcon,
  BooksIcon,
} from "@phosphor-icons/react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileQuotesOpen, setIsMobileQuotesOpen] = useState(false); 

  const { user, isLoading } = useUser();
  const hasSession = Boolean(user);

  if (isLoading) {
    return (
      <header className="sticky top-3 z-50 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <nav className="bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-2xl w-full h-16 flex items-center px-6 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <BooksIcon size={24} className="text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-700 via-indigo-900 to-slate-800 dark:from-slate-200 dark:via-indigo-200 dark:to-slate-400 bg-clip-text text-transparent">
              Shelfie
            </span>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      {/* Mobil Menü Açıkken Arkadaki Tüm Sayfayı Bulanıklaştıran Katman */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xl z-40 sm:hidden transition-all duration-300"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        />
      )}

      {/* Modern Yüzen Navbar Konteyneri */}
      <header className="sticky top-3 z-50 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <nav className="relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/20 w-full transition-all duration-300">
          <div className="flex justify-between items-center w-full h-16 px-5 sm:px-7">

            {/* Sol Taraf: Modern Gradient Logo & İkon */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group transition-opacity hover:opacity-85"
            >
              <BooksIcon 
                size={26} 
                className="text-indigo-600 dark:text-indigo-400 transition-transform group-hover:scale-105" 
                weight="duotone"
              />
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-indigo-900 dark:from-slate-100 dark:via-slate-300 dark:to-indigo-200 bg-clip-text text-transparent">
                Shelfie
              </span>
            </Link>

            {hasSession ? (
              <>
                {/* Masaüstü Navigasyon Linkleri */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {/* Home */}
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-foreground/85 hover:text-foreground hover:bg-white/50 dark:hover:bg-white/15 backdrop-blur-sm transition-all"
                  >
                    <HouseIcon size={18} className="text-foreground/80" />
                    <span>Home</span>
                  </Link>

                  {/* My Quotes (Dropdown) */}
                  <div className="relative group py-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-foreground/85 group-hover:text-foreground group-hover:bg-white/50 dark:group-hover:bg-white/15 backdrop-blur-sm transition-all cursor-pointer outline-none"
                    >
                      <ScrollIcon size={18} className="text-foreground/80" />
                      <span>My Quotes</span>
                      <CaretDownIcon
                        size={14}
                        className="text-foreground/70 group-hover:text-foreground transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    {/* Dropdown Menü */}
                    <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50 animate-in fade-in-50 slide-in-from-top-2">
                      <div className="flex flex-col w-56 p-1.5 bg-white/80 dark:bg-zinc-900/80 border border-white/50 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 backdrop-blur-2xl">
                        <Link
                          href="/user/quotes/favorite"
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <HeartIcon size={18} className="text-rose-400" />
                          <span>My Favorites</span>
                        </Link>

                        <Link
                          href="/quotes"
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <BookmarkSimpleIcon size={18} className="text-primary" />
                          <span>My Added Quotes</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* 🟢 YENİ: My Shelf */}
                  <Link
                    href="/user/shelf"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-foreground/85 hover:text-foreground hover:bg-white/50 dark:hover:bg-white/15 backdrop-blur-sm transition-all"
                  >
                    <BooksIcon size={18} className="text-foreground/80" />
                    <span>My Shelf</span>
                  </Link>

                  {/* Add Quote */}
                  <Link
                    href="/quotes/new"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-foreground/85 hover:text-foreground hover:bg-white/50 dark:hover:bg-white/15 backdrop-blur-sm transition-all"
                  >
                    <PlusIcon size={18} className="text-foreground/80" />
                    <span>Add Quote</span>
                  </Link>
                </div>

                {/* Masaüstü Profil Avatarı ve Hover/Click Açılır Menü */}
                <div className="hidden sm:flex items-center">
                  <div className="relative group py-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors cursor-pointer outline-none"
                    >
                      {user?.picture ? (
                        <Image
                          className="rounded-full ring-2 ring-white/60 dark:ring-white/10 object-cover shadow-sm"
                          src={user.picture}
                          alt={user.name || "Profile picture"}
                          width={34}
                          height={34}
                          priority
                        />
                      ) : (
                        <div className="w-8.5 h-8.5 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold">
                          {user?.name?.[0] || 'U'}
                        </div>
                      )}
                      <CaretDownIcon
                        size={14}
                        className="text-muted-foreground group-hover:text-foreground transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    {/* Profil Alt Açılır Menüsü */}
                    <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50 animate-in fade-in-50 slide-in-from-top-2">
                      <div className="flex flex-col w-56 p-1.5 bg-white/80 dark:bg-zinc-900/80 border border-white/50 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 backdrop-blur-2xl">
                        
                        {/* Menü Başlığı / Kullanıcı Bilgisi */}
                        <div className="px-3 py-2 border-b border-white/30 dark:border-white/10 mb-1">
                          <p className="text-xs font-semibold text-foreground truncate">{user?.name || user?.nickname}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
                        </div>

                        {/* Settings Linki */}
                        <Link
                          href="/user/settings"
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <GearIcon size={18} className="text-slate-500 dark:text-slate-400" />
                          <span>Settings</span>
                        </Link>

                        <hr className="my-1 border-white/30 dark:border-white/10" />

                        {/* LogOut Linki */}
                        <a
                          href="/auth/logout"
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium"
                        >
                          <SignOutIcon size={18} />
                          <span>LogOut</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobil Menü Butonu */}
                <div className="flex sm:hidden items-center gap-2">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10 focus:outline-none transition-colors"
                    aria-label="Toggle Menu"
                  >
                    {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
                  </button>
                </div>

                {/* Mobil Açılır Menü */}
                {isOpen && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col gap-1 p-4 sm:hidden animate-in slide-in-from-top-2 duration-200 z-50">
                    
                    {/* Mobil Kullanıcı Kartı */}
                    <div className="flex items-center gap-3 px-3.5 py-3 border-b border-slate-200 dark:border-zinc-800 pb-3 mb-1 bg-slate-200/50 dark:bg-zinc-800/50 rounded-xl">
                      {user?.picture && (
                        <Image
                          className="rounded-full object-cover ring-2 ring-primary/20"
                          src={user.picture}
                          alt="profile picture"
                          width={38}
                          height={38}
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || user?.nickname}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</span>
                      </div>
                    </div>

                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <HouseIcon size={18} />
                      <span>Home</span>
                    </Link>

                    {/* MOBİL ACCORDION: My Quotes */}
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setIsMobileQuotesOpen(!isMobileQuotesOpen)}
                        className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ScrollIcon size={18} />
                          <span>My Quotes</span>
                        </div>
                        <CaretDownIcon
                          size={14}
                          className={`transition-transform duration-200 ${
                            isMobileQuotesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Alt Linkler (Mobil) */}
                      {isMobileQuotesOpen && (
                        <div className="flex flex-col pl-8 pr-2 py-1 gap-1 border-l-2 border-slate-300 dark:border-zinc-700 ml-5 my-1">
                          <Link
                            href="/user/quotes/favorite"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <HeartIcon size={16} className="text-rose-400" />
                            <span>My Favorites</span>
                          </Link>

                          <Link
                            href="/quotes"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/70 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <BookmarkSimpleIcon size={16} className="text-primary" />
                            <span>My Added Quotes</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* 🟢 YENİ: My Shelf (Mobil) */}
                    <Link
                      href="/user/shelf"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <BooksIcon size={18} />
                      <span>My Shelf</span>
                    </Link>

                    <Link
                      href="/quotes/new"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <PlusIcon size={18} />
                      <span>Add New Quote</span>
                    </Link>

                    <Link
                      href="/user/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <GearIcon size={18} />
                      <span>Settings</span>
                    </Link>

                    <hr className="my-1 border-slate-300 dark:border-zinc-800" />

                    <a
                      href="/auth/logout"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium text-sm hover:bg-rose-500/20 transition-colors"
                    >
                      <SignOutIcon size={18} />
                      <span>LogOut</span>
                    </a>
                  </div>
                )}
              </>
            ) : (
              /* Giriş Yapılmamış Durum */
              <div className="flex items-center gap-3">
                <Button asChild size={ButtonSize.Sm} className="gap-2 rounded-xl">
                  <a href="/auth/login" className="flex items-center gap-1.5">
                    <span>LogIn</span>
                    <SignInIcon size={16} />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}