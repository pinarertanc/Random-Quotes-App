import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { Navbar } from "@/components/navbar"; 
import { Background } from "@/components/background";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Shelfie - Your Digital Bookshelf & Quotes',
    template: '%s | Shelfie',
  },
  description: 'Track your reading status, share impactful book quotes, and interact with fellow readers.',
  keywords: ['books', 'quotes', 'reading tracker', 'shelfie', 'bookworms'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
 
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
        
      <body className="relative min-h-screen antialiased">

        <Background />
        <Auth0Provider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar/>

          {children}
        </ThemeProvider>
        </Auth0Provider>
      </body>
      
    </html>
  );
}