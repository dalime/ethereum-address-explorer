import React from "react";
import { useRecoilState } from "recoil";
import { Card, Image } from "@nextui-org/react";

// Recoil
import { ethPriceState, walletAddressState } from "@/recoil/atoms";

// Utils
import { formatUSD } from "@/utils";

// Images
import EthLogo from "../../public/eth-logo.png";

interface Props {
  walletBalance: string;
}

function BalanceInfo({ walletBalance }: Props): JSX.Element {
  const [ethPrice] = useRecoilState(ethPriceState);
  const [walletAddress] = useRecoilState(walletAddressState);

  const walletBalanceInt = parseInt(walletBalance, 10);
  const roundedBalance = Math.round(walletBalanceInt * 100) / 100;

  const ethValue = ethPrice ? walletBalanceInt * ethPrice : null;

  return (
    <Card className="w-full p-4 mb-5 rounded-lg">
      {" "}
      {/* Assuming you want a dark card */}
      <h2 className="text-white mb-3 text-lg font-semibold">Overview</h2>
      <div>
        <div
          className="flex items-center space-x-1"
          style={{ marginBottom: -20 }}
        >
          {" "}
          {/* Adjust space as needed */}
          <Image
            src={EthLogo.src}
            alt="Ethereum"
            width={30}
            className="inline-block"
          />
          <span className="text-gray-400 text-sm">ETH ADDRESS</span>
        </div>
        <br />
        <span className="text-white text-md font-bold">{walletAddress}</span>
      </div>
      <div className="mt-3">
        <span className="text-gray-400 text-sm">ETH BALANCE</span>
        <br />
        <span className="text-white text-md font-bold">
          {roundedBalance} ETH
        </span>
      </div>
      {ethValue && (
        <div className="mt-3">
          <span className="text-gray-400 text-sm">ETH VALUE</span>
          <br />
          <span className="text-white text-md font-bold">
            {formatUSD(ethValue)}
            {ethPrice ? (
              <span className="text-white text-sm font-semibold">
                {" "}
                (@${formatUSD(ethPrice)}/ETH)
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
      )}
    </Card>
  );
}

export default BalanceInfo;
