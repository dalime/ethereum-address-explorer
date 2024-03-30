"use client";

// Global imports
import { useState, FormEvent } from "react";
import { NextUIProvider } from "@nextui-org/react";

// Types
import { Transaction } from "@/types";

// Actions
import { fetchAddressInfo } from "@/actions";

// Components
import Info from "./info";
import TransactionsTable from "./TransactionsTable";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>(
    []
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const walletInfo = await fetchAddressInfo(walletAddress);
    if (walletInfo) {
      console.log("fetched wallet info", walletInfo);
      setWalletBalance(walletInfo.balance);
      setWalletTransactions(walletInfo.transactions);
    }
  };

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark text-foreground bg-background">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Ethereum Address Explorer
          </h2>
        </div>

        <form
          className="flex flex-col gap-4 bg-gray-800 rounded-lg shadow-lg w-full"
          onSubmit={submitForm}
        >
          <div className="py-2">
            <label htmlFor="walletAddress" className="text-gray-400 block">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              className="bg-gray-700 text-white rounded-lg p-2 w-full"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            Explore
          </button>
        </form>

        {walletBalance && <Info walletBalance={walletBalance} />}
        {walletTransactions.length && (
          <TransactionsTable transactions={walletTransactions} />
        )}
      </main>
    </NextUIProvider>
  );
}
