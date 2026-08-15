'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, ButtonVariant, ButtonSize } from "@/app/components/ui/button";
import { GearIcon } from "@phosphor-icons/react/dist/ssr";

interface NavbarProps {
  user?: {
    name?: string;
    picture?: string;
  };
  hasSession: boolean;
}

export function Navbar({ user, hasSession }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 shadow-xl bg-background border-b w-full">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2 px-4 sm:px-8">
        
        {hasSession ? (
          <>
            
            <div className="hidden sm:flex gap-3 items-center">
              <Button asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button asChild>
                <Link href="/user/quotes/favorite">My Favorite Quotes</Link>
              </Button>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {user?.picture && (
                <Image
                  className="rounded-full border-2 border-(--chart-2)/50"
                  src={user.picture}
                  alt="profile picture"
                  width={45}
                  height={45}
                  priority
                />
              )}
              <Button asChild variant={ButtonVariant.Outline}>
                <a href="/auth/logout">LogOut</a>
              </Button>
              <Button asChild variant={ButtonVariant.Ghost} size={ButtonSize.Icon}>
                <Link href="/user/settings">
                  <GearIcon size={28} />
                </Link>
              </Button>
            </div>

            
            <div className="flex sm:hidden justify-between items-center w-full">
              <span className="font-semibold text-sm">QuoteApp</span>
              {user?.picture ? (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none cursor-pointer transform active:scale-95 transition-transform"
                  aria-label="Toggle Menu"
                >
                  <Image
                    className={`rounded-full border-2 ${
                      isOpen ? "border-(--chart-2) ring-2 ring-(--chart-2)" : "border-(--primary)/50"
                    }`}
                    src={user.picture}
                    alt="profile picture"
                    width={45}
                    height={45}
                    priority
                  />
                </button>
              ) : (
                <Button onClick={() => setIsOpen(!isOpen)} variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
                  Menu
                </Button>
              )}
            </div>

            
            {isOpen && (
              <div className="absolute top-full left-0 w-full bg-background border-b shadow-2xl flex flex-col gap-3 p-4 sm:hidden animate-in slide-in-from-top-2 duration-200">
                <Button asChild variant={ButtonVariant.Ghost} className="justify-start w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/">Home</Link>
                </Button>
                <Button asChild variant={ButtonVariant.Ghost} className="justify-start w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/user/quotes/favorite">My Favorite Quotes</Link>
                </Button>
                <Button asChild variant={ButtonVariant.Ghost} className="justify-start w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/user/settings" className="flex items-center gap-2">
                    <GearIcon size={20} />
                    <span>Settings</span>
                  </Link>
                </Button>
                <hr className="my-1 border-border" />
                <Button asChild variant={ButtonVariant.Destructive} className="w-full" onClick={() => setIsOpen(false)}>
                  <a href="/auth/logout">LogOut</a>
                </Button>
              </div>
            )}
          </>
        ) : (
          
          <div className="flex justify-end w-full">
            <Button asChild>
              <a href="/auth/login">LogIn</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}