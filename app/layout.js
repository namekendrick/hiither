import dynamic from "next/dynamic";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";
import { PHProvider } from "@/providers/posthog-provider";
import { QueryProvider } from "@/providers/query-provider";

import "@/styles/globals.css";

const PostHogIdentify = dynamic(() => import("@/providers/posthog-identify"), {
  ssr: false,
});

const PostHogPageview = dynamic(() => import("@/providers/posthog-pageview"), {
  ssr: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hiither",
  description: "Really cool marketing",
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
        <PHProvider>
          <body className={montserrat.className}>
            <Toaster />
            <QueryProvider>
              <ModalProvider />
              <PostHogIdentify />
              <PostHogPageview />
              {children}
            </QueryProvider>
          </body>
        </PHProvider>
      </html>
    </SessionProvider>
  );
}
