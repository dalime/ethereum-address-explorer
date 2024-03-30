"use client";

// Global imports
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

// Types
import { NFTData, Transaction } from "@/types";

// Components
import SearchInput from "./SearchInput";
import Info from "./info";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>(
    []
  );
  const [walletNfts, setWalletNfts] = useState<NFTData[]>([]);

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark text-foreground bg-background">
        <>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Ethereum Address Explorer
            </h2>
          </div>

          <SearchInput
            loading={loading}
            setLoading={setLoading}
            setWalletBalance={setWalletBalance}
            setWalletTransactions={setWalletTransactions}
            setWalletNfts={setWalletNfts}
          />
        </>

        {loading ? (
          <></>
        ) : walletBalance || walletTransactions || walletNfts ? (
          <>
            {walletBalance && <Info walletBalance={walletBalance} />}
            {walletTransactions.length ? (
              <TransactionsTable transactions={walletTransactions} />
            ) : (
              <></>
            )}
            {walletNfts.length ? <NFTs nftList={walletNfts} /> : <></>}
          </>
        ) : (
          <></>
        )}
      </main>
    </NextUIProvider>
  );
}
