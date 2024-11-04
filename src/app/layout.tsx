import { Toaster } from "@/components/ui/toaster";
import { getUserSession } from "@/lib/auth/auth";
import { constructMetadata } from "@/lib/data";
import localFont from "next/font/local";
import NavBarNew from "./_components/navbar/NavBarNew";
import "./globals.css";

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
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5af07f51-10cb-41b3-9998-d456214b0eab"></script>
      </head>
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
