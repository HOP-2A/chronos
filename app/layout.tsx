import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Chronos",
  description: "Time Management System",
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
          <div className="fixed right-6 top-6 z-100">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "h-10 w-10 border-2 border-fuchsia-500/50 hover:border-fuchsia-500 transition-all shadow-[0_0_15px_rgba(192,38,211,0.3)]",
                    userButtonTrigger: "focus:shadow-none focus:outline-none",
                    card: "bg-[#0A0A0A] border border-white/10 backdrop-blur-xl",
                    userButtonPopoverMain: "bg-[#0A0A0A]",
                    userPreviewMainIdentifier: "text-white font-bold",
                    userPreviewSecondaryIdentifier:
                      "text-gray-400 text-[10px] uppercase tracking-widest",
                    actionButtonIcon: "text-fuchsia-500",
                    actionButtonText:
                      "text-white/70 hover:text-white font-medium",
                  },
                }}
              />
            </SignedIn>
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
