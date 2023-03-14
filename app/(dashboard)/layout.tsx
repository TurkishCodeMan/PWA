'use client'

import { PropsWithChildren } from "react";
import Head from "../head";
import Pwa from "../pwa";
import { Pane } from "@/shared/components/pane";
import '@/shared/style/base.scss'
import { QueryClient, QueryClientProvider } from "react-query";

const client=new QueryClient();

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head />
      <body>
       <QueryClientProvider client={client}>
       <Pane>
        {children}
        </Pane>
       </QueryClientProvider>
      <Pwa/>
      </body>
    </html>
  );
}
