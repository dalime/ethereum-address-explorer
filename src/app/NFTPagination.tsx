import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Spinner } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

// Recoil
import {
  walletInfoState,
  walletAddressState,
  loadingState,
} from "@/recoil/atoms";

// Assets
import { ChevronDoubleLeft, ChevronLeft, ChevronRight } from "@/assets";

function NFTPagination() {
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const [loading] = useRecoilState(loadingState);
  const [nftsLoading, setNftsLoading] = useState(false);

  const walletAddressInitial = useRecoilValue(walletAddressState); // Capture the initial state

  const isExtraSmall = useMediaQuery({ maxWidth: 400 });
  const isSmall = useMediaQuery({ maxWidth: 500 });

  // Media queries for pagination
  const oneColumn = useMediaQuery({ maxWidth: 640 });
  const twoColumns = useMediaQuery({ maxWidth: 1024 });
  const threeColumns = useMediaQuery({ maxWidth: 1280 });

  if (!walletInfo) return <></>;

  /**
   * Handles fetching NFTs with the next or previous page
   * @param next boolean
   * @param first boolean | undefined
   */
  const clickPageButton = async (next: boolean, first?: boolean) => {
    if (walletInfo && walletAddressInitial) {
      const pageNum: number = first
        ? 1
        : next
        ? walletInfo.nftsPage + 1
        : walletInfo.nftsPage - 1;
      if (pageNum) {
        setNftsLoading(true);
        const newWalletInfo = {
          ...walletInfo,
          nftsPage: pageNum,
        };
        setWalletInfo(newWalletInfo);
        setNftsLoading(false);
      }
    }
  };

  // Set page size based on how wide the screen is
  const pageSize = oneColumn ? 3 : twoColumns ? 6 : threeColumns ? 9 : 12;

  const nftsLength = walletInfo ? walletInfo.nfts.length : 0;
  const marginStyle = { marginRight: isSmall ? 5 : 10 };

  const endIndex = walletInfo ? walletInfo.nftsPage * pageSize : null;

  const maxEndIndex = endIndex ? Math.min(nftsLength - 1, endIndex) : null;
  const begIndex = endIndex !== null ? endIndex - pageSize : null;

  const subArr =
    begIndex !== null && endIndex !== null
      ? walletInfo.nfts.slice(begIndex, endIndex).map((walletNft) => walletNft)
      : [];

  return (
    <>
      {walletInfo.nftsPage > 1 || walletInfo.nfts.length > pageSize ? (
        <div className="flex flex-row justify-center items-center mb-5">
          {walletInfo.nfts && walletInfo.nftsPage > 2 && !isExtraSmall ? (
            <Button
              style={marginStyle}
              onClick={() => clickPageButton(false, true)}
              disabled={loading || nftsLoading}
            >
              <ChevronDoubleLeft />
            </Button>
          ) : (
            <></>
          )}
          {walletInfo.nfts && walletInfo.nftsPage > 1 ? (
            <Button
              onClick={() => clickPageButton(false)}
              disabled={loading || nftsLoading}
              style={
                isSmall
                  ? { ...marginStyle, minWidth: "fit-content" }
                  : marginStyle
              }
            >
              <ChevronLeft />
            </Button>
          ) : (
            <></>
          )}
          {walletInfo && walletInfo.nftsPage ? (
            nftsLoading ? (
              <Spinner style={marginStyle} />
            ) : (
              <label
                className={`${isSmall ? " text-sm" : ""}`}
                style={marginStyle}
              >
                {walletInfo.nftsPage > 1 &&
                begIndex !== null &&
                maxEndIndex !== null
                  ? `${begIndex + 1} -
                    ${maxEndIndex}`
                  : `1 - ${Math.min(nftsLength, pageSize)}`}
              </label>
            )
          ) : (
            <></>
          )}
          {endIndex !== null &&
          begIndex !== null &&
          endIndex > begIndex &&
          maxEndIndex === endIndex ? (
            <Button
              onClick={() => clickPageButton(true)}
              disabled={loading || nftsLoading}
              style={isSmall ? { minWidth: "fit-content" } : {}}
            >
              <ChevronRight />
            </Button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NFTPagination;
