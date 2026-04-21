import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Header } from "@/components";
import { ReduxProvider } from "@/store";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ESL FACEIT",
  description: "Senior Frontend Challenge",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="h-[100dvh] flex flex-col">
        <Header />
        <main className="flex flex-1 justify-center items-center p-8">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
