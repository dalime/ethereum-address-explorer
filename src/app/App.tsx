import React from "react";

import { useRecoilState } from "recoil";

// Recoiil
import { loadingState, walletInfoState } from "@/recoil/atoms";

// Components
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";
import Info from "./info";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";

function App() {
  const [loading] = useRecoilState(loadingState);
  const [walletInfo] = useRecoilState(walletInfoState);

  const { balance, nfts, transactions } = walletInfo;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 dark text-foreground bg-background">
      <Navigation />
      <>
        <h2 className={`text-white mb-3 text-2xl font-semibold`}>
          Ethereum Address Explorer
        </h2>

        <SearchInput />
      </>

      {loading ? (
        <></>
      ) : balance || transactions || nfts ? (
        <>
          {balance && <Info walletBalance={balance} />}
          {transactions.length ? (
            <TransactionsTable transactions={transactions} />
          ) : (
            <></>
          )}
          {nfts.length ? <NFTs nftList={nfts} /> : <></>}
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
