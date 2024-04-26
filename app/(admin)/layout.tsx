"use client";

import { PropsWithChildren } from "react";
import Head from "@/app/head";
import Pwa from "@/app/pwa";
import { Pane } from "@/shared/components/pane";
import "@/shared/style/base.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient();

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head />
      <body cz-shortcut-listen="true">
        <QueryClientProvider client={client}>
          <SessionProvider>
            <Pane>{children}</Pane>
          </SessionProvider>
        </QueryClientProvider>
        <Pwa />
      </body>
    </html>
  );
}
