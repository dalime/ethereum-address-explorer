"use client";

// Global imports
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";

// Components
import App from "./App";

export default function Home() {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </RecoilRoot>
  );
}
