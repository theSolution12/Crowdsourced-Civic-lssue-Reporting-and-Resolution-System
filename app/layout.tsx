import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/providers/LenisProvider";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

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
    default: "जनसेतु",
    template: "%s | जनसेतु",
  },
  description: "जनसेतु - Crowdsourced Civic Issue Reporting & Resolution Platform",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/menulogo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/menulogo.png",
    apple: "/menulogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Profile Icon in top-left */}
          <div className="fixed top-4 left-4 z-[9999]">
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    popoverCard: "z-[9999]",
                    popoverActionButton: "hover:bg-gray-100",
                    popoverActions: "z-[9999]"
                  }
                }}
                userProfileMode="modal"
                afterSignOutUrl="/"
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
          <LenisProvider>{children}</LenisProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
