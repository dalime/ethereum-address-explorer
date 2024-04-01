// Global imports
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

// Types
import { Transaction } from "@/types";

// Utils
import {
  parseAddresses,
  parseGasFee,
  parseTransactionValue,
  formatETH,
} from "@/utils";

interface Props {
  transactions: Transaction[];
  mobile?: boolean;
}

function MobileTransactionsTable({ transactions }: Props) {
  return (
    <Table style={{ marginBottom: 20 }}>
      <TableHeader>
        <TableColumn>Transaction Hash</TableColumn>
        <TableColumn>From</TableColumn>
        <TableColumn>To</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const { transactionHash, topics } = transaction;

          const { fromAddress, toAddress } = parseAddresses(topics);
          const tokenAmount = parseTransactionValue(topics[3]);

          const hashStr = `${transactionHash.substring(0, 10)}...`;

          return (
            <TableRow key={transaction.transactionHash}>
              <TableCell>{hashStr}</TableCell>
              <TableCell>{fromAddress}</TableCell>
              <TableCell>{toAddress}</TableCell>
              <TableCell>
                {tokenAmount ? tokenAmount.toString() : "Unknown"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TransactionsTable({ transactions, mobile }: Props) {
  if (mobile) return <MobileTransactionsTable transactions={transactions} />;

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
            transactionHash,
            blockNumber,
            timeStamp,
            topics,
            data,
            gasPrice,
            gasUsed,
          } = transaction;

          const { fromAddress, toAddress } = parseAddresses(topics);
          const tokenAmount = parseTransactionValue(topics[3]);
          const gasFee = parseGasFee(gasUsed, gasPrice);

          const hashStr = `${transactionHash.substring(0, 13)}...`;

          return (
            <TableRow key={transaction.transactionHash}>
              <TableCell>{hashStr}</TableCell>
              <TableCell>{blockNumber}</TableCell>
              <TableCell>{timeStamp}</TableCell>
              <TableCell>{fromAddress}</TableCell>
              <TableCell>{toAddress}</TableCell>
              <TableCell>
                {tokenAmount ? tokenAmount.toString() : "Unknown"}
              </TableCell>
              <TableCell>{formatETH(gasFee)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
