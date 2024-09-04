"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import Head from "@/app/head";
import Pwa from "@/app/pwa";
const client = new QueryClient();

import "@/shared/style/base.scss";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <SessionProvider>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </SessionProvider>
      </body>

      <Pwa />

    </html>
  );
}
