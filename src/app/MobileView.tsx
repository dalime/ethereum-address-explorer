// Global imports
import React, { Key, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Tabs, Tab } from "@nextui-org/react";

// Recoil
import { ethPriceState, walletInfoState } from "@/recoil/atoms";

// Actions
import { fetchEthPrice } from "@/actions";

// Components
import BalanceInfo from "./BalanceInfo";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";

function MobileView() {
  const [walletInfo] = useRecoilState(walletInfoState);
  const [, setEthPrice] = useRecoilState(ethPriceState);

  const isXs = useMediaQuery({ maxWidth: 320 });

  const [selectedTab, setSelectedTab] = useState<string>("overview");

  useEffect(() => {
    const getAndSetEthPrice = async () => {
      const latestPrice: number | null = await fetchEthPrice();
      if (latestPrice) setEthPrice(latestPrice);
    };

    getAndSetEthPrice();
  }, [setEthPrice]);

  if (!walletInfo) return <></>;

  const renderInfo = (): JSX.Element => {
    switch (selectedTab) {
      case "overview":
        return walletInfo.balance ? (
          <BalanceInfo walletBalance={walletInfo.balance} />
        ) : (
          <></>
        );
      case "transactions":
        return walletInfo.transactions.length ? (
          <TransactionsTable transactions={walletInfo.transactions} mobile />
        ) : (
          <></>
        );
      case "nfts":
        return walletInfo.nfts.length ? (
          <NFTs nftList={walletInfo.nfts} />
        ) : (
          <></>
        );
      default:
        return <></>;
    }
  };

  const updateTab = (newTab: Key): void => {
    console.log("updating tab", newTab);
    const stringRep = newTab.toString();
    console.log("stringRep", stringRep);
    setSelectedTab(stringRep);
  };

  return (
    // <div style={{ position: "relative" }}>
    <>
      <div
        className="blurry-background"
        style={{
          position: "sticky",
          top: 63,
          width: "100vw",
          zIndex: 11,
        }}
      >
        <Tabs
          onSelectionChange={(key) => updateTab(key)}
          color="primary"
          aria-label="Tabs colors"
          radius="full"
          fullWidth
          style={{
            width: "calc(100vw - 3rem)",
            marginLeft: "1.5rem",
            marginBottom: 5,
          }}
        >
          <Tab key="overview" title={isXs ? "Info" : "Overview"} />
          <Tab key="transactions" title={isXs ? "Trans..." : "Transactions"} />
          <Tab key="nfts" title={isXs ? "NFT" : "NFTs"} />
        </Tabs>
      </div>
      <div
        className={`flex min-h-screen flex-col items-center justify-start dark text-foreground bg-background`}
        style={{ marginTop: 10, maxWidth: "calc(100vw - 3rem)" }}
      >
        {renderInfo()}
      </div>
    </>
  );
}

export default MobileView;
