import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Card, Image } from "@nextui-org/react";

// Recoil
import { ethPriceState, walletAddressState } from "@/recoil/atoms";

// Utils
import { formatUSD, formatETH } from "@/utils";

// Images
import EthLogo from "../../public/eth-logo.png";

interface Props {
  walletBalance: string;
}

function BalanceInfo({ walletBalance }: Props): JSX.Element {
  const [ethPrice] = useRecoilState(ethPriceState);
  const walletAddressInitial = useRecoilValue(walletAddressState); // Capture the initial state
  const walletAddressRef = useRef(walletAddressInitial); // Use useRef to hold the initial value

  const isSmall = useMediaQuery({ maxWidth: 640 });

  const walletBalanceInt = parseInt(walletBalance, 10);
  const roundedBalance = Math.round(walletBalanceInt * 100) / 100;

  const ethValue = ethPrice ? walletBalanceInt * ethPrice : null;

  return (
    <Card className="w-full p-4 mb-5 rounded-lg">
      <div>
        <div
          className="flex items-center space-x-1"
          style={{ marginBottom: -20 }}
        >
          {" "}
          <Image
            src={EthLogo.src}
            alt="Ethereum"
            width={30}
            className="inline-block"
          />
          <span className="text-gray-400 text-sm">ETH ADDRESS</span>
        </div>
        <br />
        <span
          className={`text-white text-${isSmall ? "sm" : "md"} font-bold`}
          style={{ overflowWrap: "break-word" }}
        >
          {walletAddressRef.current}
        </span>
      </div>
      <div className="mt-3">
        <span className="text-gray-400 text-sm">ETH BALANCE</span>
        <br />
        <span
          className={`text-white text-${isSmall ? "sm" : "md"} font-bold`}
          style={{ overflowWrap: "break-word" }}
        >
          {formatETH(walletBalanceInt)}
        </span>
      </div>
      {ethValue && (
        <div className="mt-3">
          <span className="text-gray-400 text-sm">ETH VALUE</span>
          <br />
          <span
            className={`text-white text-${isSmall ? "sm" : "md"} font-bold`}
            style={{ overflowWrap: "break-word" }}
          >
            {formatUSD(ethValue)}
          </span>
          <br />
          {ethPrice ? (
            <span className="text-white text-sm font-semibold">
              {" "}
              (@${formatUSD(ethPrice)}/ETH)
            </span>
          ) : (
            ""
          )}
        </div>
      )}
    </Card>
  );
}

export default BalanceInfo;
