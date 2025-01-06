import Script from "next/script";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Analytics } from "@/providers/segment-provider";

import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hiither",
  description: "Comments without borders",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Script
          src={`${process.env.NEXT_PUBLIC_APP_URL}/embed.js`}
          strategy="afterInteractive"
        />
        <body className={montserrat.className}>
          <Toaster />
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
        </body>
        <Analytics />
      </html>
    </SessionProvider>
  );
}
