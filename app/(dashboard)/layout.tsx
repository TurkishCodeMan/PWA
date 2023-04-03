"use client";

import { PropsWithChildren } from "react";
import Head from "@/app/head";
import Pwa from "@/app/pwa";
import { Pane } from "@/shared/components/pane";
import "@/shared/style/base.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient();

export default function AuthRootLayot({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head />
     
      <body cz-shortcut-listen="true">
        <SessionProvider>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </SessionProvider>
        <Pwa />

        <div id="modal"></div>
      </body>
    </html>
  );
}
