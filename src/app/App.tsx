"use client";

// Global imports
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import {
  Image,
  Accordion,
  AccordionItem,
  Link,
  Selection,
} from "@nextui-org/react";

// Recoiil
import { ethPriceState, loadingState, walletInfoState } from "@/recoil/atoms";

// Actions
import { fetchEthPrice } from "@/actions";

// Components
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";
// import MobileView from "./MobileView";
import BalanceInfo from "./BalanceInfo";
// import TransactionsTable from "./TransactionsTable";
// import NFTs from "./NFTs";
import LoadingMessage from "./LoadingMessage";
import TransactionsPagination from "./TransactionsPagination";

// Images
import EthLogo from "../../public/eth-logo.png";

const ClientMobileView = dynamic(() => import("./MobileView"), {
  ssr: false,
});

const ClientNFTs = dynamic(() => import("./NFTs"), {
  ssr: false,
});

const ClientTransactions = dynamic(() => import("./TransactionsTable"), {
  ssr: false,
});

function App() {
  const [loading] = useRecoilState(loadingState);
  const [walletInfo] = useRecoilState(walletInfoState);
  const [, setEthPrice] = useRecoilState(ethPriceState);

  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1000 });
  const isDesktop = useMediaQuery({ maxWidth: 1200 });

  const lastSelectedTab = sessionStorage.getItem("lastSelectedTab");
  let lastSelectedIndex: string = "";
  switch (lastSelectedTab) {
    case "transactions":
      lastSelectedIndex = "1";
      break;
    case "nfts":
      lastSelectedIndex = "2";
      break;
    default:
      break;
  }

  useEffect(() => {
    const getAndSetEthPrice = async () => {
      const latestPrice: number | null = await fetchEthPrice();
      if (latestPrice) setEthPrice(latestPrice);
    };

    getAndSetEthPrice();
  }, [setEthPrice]);

  /**
   * Scroll to the top of the main element
   * @param delay boolean | undefined
   */
  const scrollToTop = (delay?: boolean) => {
    setTimeout(
      () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth", // Optional: Defines the transition animation.
        });
      },
      delay ? 300 : 0
    );
  };

  return (
    <div className="flex flex-col min-h-screen dark text-foreground bg-background">
      {walletInfo ? <Navigation scrollToTop={() => scrollToTop()} /> : <></>}
      <main
        className={`flex flex-col items-center justify-${
          isMobile && walletInfo ? "start" : "center"
        } grow px-${
          isMobile ? "6" : isTablet ? "12" : isDesktop ? "16" : "24"
        }`}
        style={{
          paddingLeft: `${
            isMobile ? 1.5 : isTablet ? 3 : isDesktop ? 4 : 6
          }rem`,
          paddingRight: `${
            isMobile ? 1.5 : isTablet ? 3 : isDesktop ? 4 : 6
          }rem`,
          position: isMobile ? "relative" : "initial",
          paddingBottom: 40,
        }}
      >
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
          <LoadingMessage />
        ) : walletInfo ? (
          !isSmall ? (
            <>
              {walletInfo.balance ? (
                <BalanceInfo walletBalance={walletInfo.balance} />
              ) : (
                <p className="text-sm text-white text-center">
                  Overview not available
                </p>
              )}
              <Accordion
                defaultExpandedKeys={[lastSelectedIndex || "1"]}
                onSelectionChange={(key: Selection) => {
                  const keyValue = (key.valueOf() as any)["currentKey"];
                  let sessionValue = "";
                  scrollToTop(true);
                  switch (keyValue) {
                    case "1":
                      sessionValue = "transactions";
                      break;
                    case "2":
                      sessionValue = "nfts";
                      break;
                    default:
                      break;
                  }
                  sessionStorage.setItem("lastSelectedTab", sessionValue);
                }}
              >
                <AccordionItem
                  key="1"
                  aria-label="Accordian Transactions"
                  title="Transactions"
                >
                  {walletInfo && walletInfo.transactions.length ? (
                    <>
                      <ClientTransactions
                        transactions={walletInfo.transactions}
                      />
                      <TransactionsPagination />
                    </>
                  ) : (
                    <p className="text-sm text-white text-center">
                      This wallet has no recorded transactions
                    </p>
                  )}
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion NFTs" title="NFTs">
                  {walletInfo.nfts.length ? (
                    <ClientNFTs nftList={walletInfo.nfts} />
                  ) : (
                    <p className="text-sm text-white text-center">
                      This wallet does not have any NFTs
                    </p>
                  )}
                </AccordionItem>
              </Accordion>
            </>
          ) : (
            <ClientMobileView />
          )
        ) : (
          <></>
        )}
      </main>

      <footer className="text-white text-sm text-center p-5">
        Developed by <span className="font-bold">Danny Lim</span>{" "}
        <Link href="https://github.com/dalime">(dalime)</Link>
      </footer>
    </div>
  );
}

export default App;
