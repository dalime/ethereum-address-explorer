// Global imports
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Image } from "@nextui-org/react";

// Recoiil
import { ethPriceState, loadingState, walletInfoState } from "@/recoil/atoms";

// Actions
import { fetchEthPrice } from "@/actions";

// Components
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";
import BalanceInfo from "./BalanceInfo";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";

// Images
import EthLogo from "../../public/eth-logo.png";

function App() {
  const [loading] = useRecoilState(loadingState);
  const [walletInfo] = useRecoilState(walletInfoState);
  const [, setEthPrice] = useRecoilState(ethPriceState);

  useEffect(() => {
    const getAndSetEthPrice = async () => {
      const latestPrice: number | null = await fetchEthPrice();
      if (latestPrice) setEthPrice(latestPrice);
    };

    getAndSetEthPrice();
  }, [setEthPrice]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center dark text-foreground bg-background"
      style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
    >
      {walletInfo ? <Navigation /> : <></>}

      {walletInfo ? (
        <></>
      ) : (
        <>
          <Image
            src={EthLogo.src}
            alt="Ethereum"
            width={80}
            style={{ width: 80, height: "auto", marginBottom: 20 }}
          />
          <h1 className={`text-white mb-3 text-2xl font-semibold`}>
            Ethereum Address Explorer
          </h1>

          <SearchInput />
        </>
      )}

      {loading ? (
        <></>
      ) : walletInfo ? (
        <>
          {walletInfo.balance && (
            <BalanceInfo walletBalance={walletInfo.balance} />
          )}
          {walletInfo.transactions.length ? (
            <TransactionsTable transactions={walletInfo.transactions} />
          ) : (
            <></>
          )}
          {walletInfo.nfts.length ? <NFTs nftList={walletInfo.nfts} /> : <></>}
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
