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
  Tooltip,
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
  shrinkAddress,
  formatValueToEth,
  calculateGasFeeInEth,
  capitalizeFirstLetterOfEachWord,
} from "@/utils";
import TransactionsPagination from "./TransactionsPagination";

interface LinkBtnProps {
  children?: JSX.Element | JSX.Element[] | string;
  func: () => void;
  tooltipText?: string;
}

function LinkBtn({ children, func, tooltipText }: LinkBtnProps): JSX.Element {
  const renderLink = (): JSX.Element => (
    <Link style={{ cursor: "pointer" }} onClick={() => func()}>
      {children}
    </Link>
  );

  if (tooltipText)
    return (
      <Tooltip
        color="foreground"
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold text-white">{tooltipText}</div>
          </div>
        }
      >
        {renderLink()}
      </Tooltip>
    );

  return renderLink();
}

interface Props {
  transactions: Transaction[];
}

function TransactionsTable({ transactions }: Props) {
  const [, setLoading] = useRecoilState(loadingState);
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);

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

  const transactionsLength = transactions.length;
  const firstTwentyTransactions =
    transactionsLength > 20 ? transactions.slice(0, 20) : transactions;

  return (
    <Table
      style={{ marginBottom: 20 }}
      bottomContent={<TransactionsPagination />}
    >
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Transaction Hash</TableColumn>
        <TableColumn>Block</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>From</TableColumn>
        <TableColumn>To</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>Gas Fee</TableColumn>
      </TableHeader>
      <TableBody>
        {firstTwentyTransactions.map((transaction, index) => {
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
          const timeAgoFinal = capitalizeFirstLetterOfEachWord(timeAgo);
          const hashStr = `${hash.substring(0, 13)}...`;
          const gasFeeInEth = calculateGasFeeInEth(gasUsed, gasPrice);
          const finalValue = formatValueToEth(value);

          return (
            // <TransactionRow
            //   key={`transaction-${hash}`}
            //   transaction={transaction}
            //   index={index}
            // />
            // Cannot create separate TransactionRow component because of NextUI bug
            // "type.getCollectionNode is not a function" error when trying to put a Component as child of TableBody
            <TableRow key={`transaction-${hash}`}>
              <TableCell>
                {walletInfo && walletInfo.transactionsPage
                  ? (walletInfo.transactionsPage - 1) * 20 + index + 1
                  : index + 1}
              </TableCell>
              <TableCell>
                <LinkBtn
                  func={() =>
                    (window.location.href = `https://etherscan.io/tx/${hash}`)
                  }
                  tooltipText="View in Etherscan"
                >
                  {hashStr}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <LinkBtn
                  func={() =>
                    (window.location.href = `https://etherscan.io/block/${blockNumber}`)
                  }
                  tooltipText="View in Etherscan"
                >
                  {blockNumber}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <span style={{ whiteSpace: "nowrap" }}>{timeAgoFinal}</span>
              </TableCell>
              <TableCell>
                <LinkBtn
                  func={() => exploreNewWallet(from)}
                  tooltipText="Explore this address"
                >
                  {from ? shrinkAddress(from) : ""}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <LinkBtn
                  func={() => exploreNewWallet(to)}
                  tooltipText="Explore this address"
                >
                  {to ? shrinkAddress(to) : ""}
                </LinkBtn>
              </TableCell>
              <TableCell>
                <span style={{ whiteSpace: "nowrap" }}>{finalValue || ""}</span>
              </TableCell>
              <TableCell>
                <span style={{ whiteSpace: "nowrap" }}>
                  {gasFeeInEth || ""}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
