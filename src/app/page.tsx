"use client";

// Global imports
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

// Types
import { NFTData, Transaction } from "@/types";

// Components
import Navigation from "./Navigation";
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
        <Navigation
          loading={loading}
          setLoading={setLoading}
          setWalletBalance={setWalletBalance}
          setWalletTransactions={setWalletTransactions}
          setWalletNfts={setWalletNfts}
        />
        <>
          <h2 className={`text-white mb-3 text-2xl font-semibold`}>
            Ethereum Address Explorer
          </h2>

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
