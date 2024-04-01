"use client";

// Global imports
import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

// Components
import App from "./App";

const DynamicApp = dynamic(() => import("./App"), { ssr: false });

export default function Home() {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <DynamicApp />
      </NextUIProvider>
      <Toaster position="bottom-left" reverseOrder={false} />
    </RecoilRoot>
  );
}
