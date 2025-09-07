import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/providers/LenisProvider";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

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
          <div className="fixed top-2 left-2 md:top-4 md:left-4 z-[9999]">
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 md:w-10 md:h-10",
                    popoverCard: "z-[9999] mt-2 ml-2",
                    popoverActionButton: "hover:bg-gray-100",
                    popoverActions: "z-[9999]"
                  }
                }}
                userProfileMode="modal"
                afterSignOutUrl="/"
              />
            </SignedIn>
            {/* When signed out, do not render any icon */}
          </div>
          <LenisProvider>{children}</LenisProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
