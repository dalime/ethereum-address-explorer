// Global imports
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Image, Accordion, AccordionItem, Link } from "@nextui-org/react";

// Recoiil
import { ethPriceState, loadingState, walletInfoState } from "@/recoil/atoms";

// Actions
import { fetchEthPrice } from "@/actions";

// Components
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";
import MobileView from "./MobileView";
import BalanceInfo from "./BalanceInfo";
import TransactionsTable from "./TransactionsTable";
import NFTs from "./NFTs";
import LoadingMessage from "./LoadingMessage";

// Images
import EthLogo from "../../public/eth-logo.png";

function App() {
  const [loading] = useRecoilState(loadingState);
  const [walletInfo] = useRecoilState(walletInfoState);
  const [, setEthPrice] = useRecoilState(ethPriceState);

  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1000 });
  const isDesktop = useMediaQuery({ maxWidth: 1200 });

  useEffect(() => {
    const getAndSetEthPrice = async () => {
      const latestPrice: number | null = await fetchEthPrice();
      if (latestPrice) setEthPrice(latestPrice);
    };

    getAndSetEthPrice();
  }, [setEthPrice]);

  return (
    <div className="flex flex-col min-h-screen dark text-foreground bg-background">
      {walletInfo ? <Navigation /> : <></>}
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
            <Accordion defaultExpandedKeys={["1"]}>
              <AccordionItem key="1" aria-label="Accordion 1" title="Overview">
                {walletInfo.balance && (
                  <BalanceInfo walletBalance={walletInfo.balance} />
                )}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Transactions"
              >
                {walletInfo && walletInfo.transactions.length ? (
                  <>
                    <TransactionsTable transactions={walletInfo.transactions} />
                    {walletInfo.transactions.length >= 20 ? (
                      <p className="text-white text-sm text-center mt-3">
                        Showing first 20 transactions
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="NFTs">
                {walletInfo.nfts.length ? (
                  <NFTs nftList={walletInfo.nfts} />
                ) : (
                  <></>
                )}
              </AccordionItem>
            </Accordion>
          ) : (
            <MobileView />
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
