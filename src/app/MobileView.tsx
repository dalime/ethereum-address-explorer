// Global imports
import dynamic from "next/dynamic";
import React, { Key, useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Tabs, Tab, Button, Tooltip } from "@nextui-org/react";

// Recoil
import { walletInfoState, walletAddressState } from "@/recoil/atoms";

// Components
import BalanceInfo from "./BalanceInfo";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";

const ClientNFTs = dynamic(() => import("./NFTs"), {
  ssr: false,
});

const ClientTransactions = dynamic(() => import("./TransactionsTable"), {
  ssr: false,
});

function MobileView() {
  const [walletInfo] = useRecoilState(walletInfoState);
  const walletAddressInitial = useRecoilValue(walletAddressState); // Capture the initial state
  const walletAddressRef = useRef(walletAddressInitial); // Use useRef to hold the initial value

  const isXs = useMediaQuery({ maxWidth: 320 });

  const lastSelectedTab = sessionStorage.getItem("lastSelectedTab");

  const [selectedTab, setSelectedTab] = useState<string>(
    lastSelectedTab || "overview"
  );

  useEffect(() => {
    // Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Reset zoom to default
    (document.body.style as any)["zoom"] = "1";
  }, []);

  if (!walletInfo) return <></>;

  const renderInfo = (): JSX.Element => {
    switch (selectedTab) {
      case "overview":
        return walletInfo.balance ? (
          <BalanceInfo walletBalance={walletInfo.balance} />
        ) : (
          <p className="text-sm text-white text-center">
            Overview not available
          </p>
        );
      case "transactions":
        return walletInfo.transactions && walletInfo.transactions.length ? (
          <>
            <ClientTransactions transactions={walletInfo.transactions} />
            {walletInfo.transactions.length >= 20 ? (
              <p className="text-white text-sm text-center mt-3">
                Showing last 20 transactions
                <Tooltip
                  color="foreground"
                  content={
                    <div className="px-1 py-2">
                      <div className="text-small font-bold text-white">
                        View in Etherscan
                      </div>
                    </div>
                  }
                >
                  <Button
                    onClick={() =>
                      (window.location.href = `https://etherscan.io/address/${walletAddressRef.current}`)
                    }
                    color="primary"
                    style={{ marginLeft: 5 }}
                  >
                    View All
                  </Button>
                </Tooltip>
              </p>
            ) : (
              <></>
            )}
          </>
        ) : (
          <p className="text-sm text-white text-center">
            This wallet has no recorded transactions
          </p>
        );
      case "nfts":
        return walletInfo.nfts.length ? (
          <ClientNFTs nftList={walletInfo.nfts} />
        ) : (
          <p className="text-sm text-white text-center">
            This wallet does not have any NFTs
          </p>
        );
      default:
        return <></>;
    }
  };

  const updateTab = (newTab: Key): void => {
    const stringRep = newTab.toString();
    setSelectedTab(stringRep);
    sessionStorage.setItem("lastSelectedTab", stringRep);
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
        style={{
          marginTop: 10,
          maxWidth: "calc(100vw - 3rem)",
          width: selectedTab !== "nfts" ? "100%" : "auto",
        }}
      >
        {renderInfo()}
      </div>
    </>
  );
}

export default MobileView;
