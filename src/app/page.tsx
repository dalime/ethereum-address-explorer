"use client";

// Global imports
import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import { config } from "@/wagmiconfig";

const queryClient = new QueryClient();

const DynamicApp = dynamic(() => import("./App"), { ssr: false });

export default function Home() {
  return (
    <RecoilRoot>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <DynamicApp />
          </NextUIProvider>
          <Toaster position="bottom-left" reverseOrder={false} />
        </QueryClientProvider>
      </WagmiProvider>
    </RecoilRoot>
  );
}
