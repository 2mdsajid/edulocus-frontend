import { Toaster } from "@/components/ui/toaster";
import { getUserSession } from "@/lib/auth/auth";
import { constructMetadata } from "@/lib/data";
import localFont from "next/font/local";
import NavBarNew from "./_components/navbar/NavBarNew";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import "./globals.css";

import { cookies } from 'next/headers'

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
  const cookieStore = await cookies()

  const authToken = cookieStore.get('auth-token')?.value || ''
  // const session = await auth()

  return (
    <html lang="en">
      <head>
        {/* <script defer src="https://cloud.umami.is/script.js" data-website-id="5af07f51-10cb-41b3-9998-d456214b0eab"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBarNew 
        user={user} 
        authToken={authToken}
        />
        <main className='relative'>
          {/* NUQS = typesafe url query parameter state management */}
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
      </body>
      <Toaster />
    </html>
  );
}
