// Global imports
import React from "react";
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

// Utils
import { formatETH, shrinkAddress } from "@/utils";

interface Props {
  transactions: Transaction[];
  mobile?: boolean;
}

function TransactionsTable({ transactions, mobile }: Props) {
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
            blockHash,
            blockNumber,
            timeStamp,
            value,
            from,
            to,
            gasPrice,
            gasUsed,
          } = transaction;

          const timeAgo = formatDistanceToNow(
            new Date(parseInt(timeStamp, 10) * 1000)
          );
          const valueInEth = BigInt(value) / 10n ** 18n;
          const gasFeeInEth = (BigInt(gasPrice) * BigInt(gasUsed)) / 10n ** 18n;
          const hashStr = `${blockHash.substring(0, 13)}...`;

          return (
            <TableRow key={`transaction-${blockHash}`}>
              <TableCell>
                <Link>{hashStr}</Link>
              </TableCell>
              <TableCell>{blockNumber}</TableCell>
              <TableCell>{timeAgo}</TableCell>
              <TableCell>{from ? shrinkAddress(from) : ""}</TableCell>
              <TableCell>{to ? shrinkAddress(to) : ""}</TableCell>
              <TableCell>{valueInEth ? formatETH(valueInEth) : ""}</TableCell>
              <TableCell>{gasFeeInEth ? formatETH(gasFeeInEth) : ""}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
