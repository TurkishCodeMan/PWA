'use client'

import { PropsWithChildren } from "react";
import Head from "@/app/head";
import Pwa from "@/app/pwa";
import { Pane } from "@/shared/components/pane";
import '@/shared/style/base.scss'
import { QueryClient, QueryClientProvider } from "react-query";

const client=new QueryClient();

export default function AuthRootLayot({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head />
      <body  cz-shortcut-listen="true">
       <QueryClientProvider client={client}>
       <Pane>
        {children}
        </Pane>
       </QueryClientProvider>
      <Pwa/>

      <div id="modal"></div>

      </body>
    </html>
  );
}
