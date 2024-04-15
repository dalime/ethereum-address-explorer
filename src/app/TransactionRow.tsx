import React from "react";
import { useEnsName } from "wagmi";
import { useRecoilState } from "recoil";
import { formatDistanceToNow } from "date-fns";
import { TableRow, TableCell, Tooltip, Link } from "@nextui-org/react";

// Types
import { Transaction } from "@/types";

// Recoil
import { walletInfoState, loadingState } from "@/recoil/atoms";

// Actions
import { fetchAddressInfo } from "@/actions";

// Utils
import {
  formatETH,
  shrinkAddress,
  formatValueToEth,
  calculateGasFeeInEth,
  capitalizeFirstLetterOfEachWord,
} from "@/utils";

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
  transaction: Transaction;
  index: number;
}

function TransactionRow({ transaction, index }: Props) {
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const [, setLoading] = useRecoilState(loadingState);

  const { blockNumber, timeStamp, value, from, to, gasPrice, gasUsed, hash } =
    transaction;

  const timeAgo = formatDistanceToNow(new Date(parseInt(timeStamp, 10) * 1000));
  const timeAgoFinal = capitalizeFirstLetterOfEachWord(timeAgo);
  const hashStr = `${hash.substring(0, 13)}...`;
  const gasFeeInEth = calculateGasFeeInEth(gasUsed, gasPrice);
  const finalValue = formatValueToEth(value);

  // const { data, error, status } = useEnsName({
  const fromData = useEnsName({
    address: from as `0x${string}`,
  });

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
    <TableRow>
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
        <span style={{ whiteSpace: "nowrap" }}>{gasFeeInEth || ""}</span>
      </TableCell>
    </TableRow>
  );
}

export default TransactionRow;
