import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Header } from "@/components";
import { ReduxProvider } from "@/store";

export const metadata: Metadata = {
  title: "ESL FACEIT",
  description: "Senior Frontend Challenge",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <Header />
        <main className="h-full flex flex-1 justify-center p-8">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}
