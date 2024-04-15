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

// Types
import { Transaction } from "@/types";

// Actions
import { fetchWalletTransactions } from "@/actions";

// Assets
import { ChevronDoubleLeft, ChevronLeft, ChevronRight } from "@/assets";

function TransactionsPagination() {
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const [loading] = useRecoilState(loadingState);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const walletAddressInitial = useRecoilValue(walletAddressState); // Capture the initial state

  const isExtraSmall = useMediaQuery({ maxWidth: 400 });
  const isSmall = useMediaQuery({ maxWidth: 500 });

  if (!walletInfo) return <></>;

  /**
   * Handles fetching transactions with the next or previous page
   * @param next boolean
   * @param first boolean | undefined
   */
  const clickPageButton = async (next: boolean, first?: boolean) => {
    if (walletInfo && walletAddressInitial) {
      const pageNum: number = first
        ? 1
        : next
        ? walletInfo.transactionsPage + 1
        : walletInfo.transactionsPage - 1;
      if (pageNum) {
        setTransactionsLoading(true);
        const newPage = (await fetchWalletTransactions(
          walletAddressInitial,
          pageNum
        )) as Transaction[];
        const newWalletInfo = {
          ...walletInfo,
          transactions: newPage,
          transactionsPage: pageNum,
        };
        setWalletInfo(newWalletInfo);
        setTransactionsLoading(false);
      }
    }
  };

  const transactionsLength = walletInfo ? walletInfo.transactions.length : 0;
  const marginStyle = { marginRight: isSmall ? 5 : 10 };

  return (
    <>
      {walletInfo.transactionsPage > 1 ||
      walletInfo.transactions.length > 20 ? (
        <div className="flex flex-row justify-center items-center mt-10 mb-10">
          {walletInfo.transactions &&
          walletInfo.transactionsPage > 2 &&
          !isExtraSmall ? (
            <Button
              style={marginStyle}
              onClick={() => clickPageButton(false, true)}
              disabled={loading || transactionsLoading}
            >
              <ChevronDoubleLeft />
            </Button>
          ) : (
            <></>
          )}
          {walletInfo.transactions && walletInfo.transactionsPage > 1 ? (
            <Button
              onClick={() => clickPageButton(false)}
              disabled={loading || transactionsLoading}
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
          {walletInfo && walletInfo.transactionsPage ? (
            transactionsLoading ? (
              <Spinner style={marginStyle} />
            ) : (
              <label
                className={`${isSmall ? " text-sm" : ""}`}
                style={marginStyle}
              >
                {walletInfo.transactionsPage > 1
                  ? `${(walletInfo.transactionsPage - 1) * 20 + 1} -
                    ${
                      (walletInfo.transactionsPage - 1) * 20 +
                      Math.min(transactionsLength, 20)
                    }`
                  : `1 - ${Math.min(transactionsLength, 20)}`}
              </label>
            )
          ) : (
            <></>
          )}
          {transactionsLength > 20 ? (
            <Button
              onClick={() => clickPageButton(true)}
              disabled={loading || transactionsLoading}
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

export default TransactionsPagination;
