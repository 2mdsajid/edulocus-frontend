import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "./_components/navbar/NavBar";
import { getUserSession } from "@/lib/auth/auth";
import NavBarNew from "./_components/navbar/NavBarNew";
import { constructMetadata } from "@/lib/data";
import { redirect } from "next/navigation";
import ComingSoon from "./_components/ComingSoon";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, message: userAuthMessage } = await getUserSession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBarNew user={user} />
        <main className='relative'>
          {children}
        </main>
      </body>
      <Toaster />
    </html>
  );
}
