// Global imports
import React from "react";
import { useRecoilState } from "recoil";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";

// Types
import { Transaction } from "@/types";

// Recoil
import { loadingState, walletInfoState } from "@/recoil/atoms";

// Actions
import { fetchAddressInfo } from "@/actions";

// Utils
import {
  formatETH,
  shrinkAddress,
  formatValueToEth,
  calculateGasFeeInEth,
} from "@/utils";

interface LinkBtnProps {
  children?: JSX.Element | JSX.Element[] | string;
  func: () => void;
}

function LinkBtn({ children, func }: LinkBtnProps): JSX.Element {
  return (
    <Link style={{ cursor: "pointer" }} onClick={() => func()}>
      {children}
    </Link>
  );
}

interface Props {
  transactions: Transaction[];
}

function TransactionsTable({ transactions }: Props) {
  const [, setLoading] = useRecoilState(loadingState);
  const [, setWalletInfo] = useRecoilState(walletInfoState);

  /**
   * Submits the form
   * @param e FormEvent<HTMLFormElement>
   */
  const exploreNewWallet = async (walletAddress: string) => {
    setLoading(true);
    const walletInfo = await fetchAddressInfo(walletAddress);
    setLoading(false);
    if (walletInfo) {
      console.log("fetched wallet info", walletInfo);
      setWalletInfo(walletInfo);
    }
  };

  return (
    <Table style={{ marginBottom: 20 }}>
      <TableHeader>
        <TableColumn>Transaction Hash</TableColumn>
        <TableColumn>Block</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>From</TableColumn>
        <TableColumn>To</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>Gas Fee</TableColumn>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const {
            blockNumber,
            timeStamp,
            value,
            from,
            to,
            gasPrice,
            gasUsed,
            hash,
          } = transaction;

          const timeAgo = formatDistanceToNow(
            new Date(parseInt(timeStamp, 10) * 1000)
          );
          const hashStr = `${hash.substring(0, 13)}...`;
          const gasFeeInEth = calculateGasFeeInEth(gasUsed, gasPrice);
          const finalValue = formatValueToEth(value);

          return (
            <TableRow key={`transaction-${hash}`}>
              <TableCell>
                <LinkBtn
                  func={() =>
                    (window.location.href = `https://etherscan.io/tx/${hash}`)
                  }
                >
                  {hashStr}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <LinkBtn
                  func={() =>
                    (window.location.href = `https://etherscan.io/block/${blockNumber}`)
                  }
                >
                  {blockNumber}
                </LinkBtn>
              </TableCell>
              <TableCell>{timeAgo}</TableCell>
              <TableCell>
                <LinkBtn func={() => exploreNewWallet(from)}>
                  {from ? shrinkAddress(from) : ""}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <LinkBtn func={() => exploreNewWallet(to)}>
                  {to ? shrinkAddress(to) : ""}
                </LinkBtn>
              </TableCell>
              <TableCell>{finalValue || ""}</TableCell>
              <TableCell>{gasFeeInEth || ""}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
