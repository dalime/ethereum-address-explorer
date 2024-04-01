"use client";

// Global imports
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

// Components
import App from "./App";

export default function Home() {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <App />
      </NextUIProvider>
      <Toaster position="bottom-left" reverseOrder={false} />
    </RecoilRoot>
  );
}
