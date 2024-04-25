import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Card, Image, Tooltip, Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useEnsName } from "wagmi";

// Recoil
import { ethPriceState, walletAddressState } from "@/recoil/atoms";

// Utils
import { formatUSD, copyTextToClipboard } from "@/utils";

// Images
import EthLogo from "../../public/eth-logo.png";

function formatEth(value: string): string {
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    throw new Error("Invalid input: value is not a number");
  }

  const decimalPlaces = numericValue < 1 ? 6 : 4;

  // Format with thousands separators and dynamic decimal places
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numericValue);

  return `${formattedValue} ETH`;
}

interface Props {
  walletBalance: string;
}

function BalanceInfo({ walletBalance }: Props): JSX.Element {
  const [ethPrice] = useRecoilState(ethPriceState);
  const walletAddressInitial = useRecoilValue(walletAddressState); // Capture the initial state

  const walletAddressRef = useRef(walletAddressInitial); // Use useRef to hold the initial value

  const { data, error, status } = useEnsName({
    address: walletAddressRef.current as `0x${string}`,
  });

  const isSmall = useMediaQuery({ maxWidth: 640 });
  const walletBalanceInt = parseInt(walletBalance, 10);
  const formattedBalance = formatEth(walletBalance);
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
          style={{
            overflowWrap: "anywhere",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {walletAddressRef.current}
          <Tooltip
            color="foreground"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold text-white">
                  Copy to clipboard
                </div>
              </div>
            }
          >
            <Button
              variant="ghost"
              style={{
                padding: 5,
                width: "fit-content",
                minWidth: 0,
                marginLeft: 5,
              }}
              onClick={async () => {
                const response = await copyTextToClipboard(
                  walletAddressRef.current
                );
                if (response) toast.success("Copied to clipboard");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            </Button>
          </Tooltip>
        </span>
      </div>
      {data && !error && status.includes("success") ? (
        <div className="mt-3">
          <div
            className="flex items-center space-x-1"
            style={{ marginBottom: -20 }}
          >
            <span className="text-gray-400 text-sm">ENS NAME</span>
          </div>
          <br />
          <span
            className={`text-white text-${isSmall ? "sm" : "md"} font-bold`}
            style={{
              overflowWrap: "anywhere",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {data}
            <Tooltip
              color="foreground"
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold text-white">
                    Copy to clipboard
                  </div>
                </div>
              }
            >
              <Button
                variant="ghost"
                style={{
                  padding: 5,
                  width: "fit-content",
                  minWidth: 0,
                  marginLeft: 5,
                }}
                onClick={async () => {
                  const response = await copyTextToClipboard(data);
                  if (response) toast.success("Copied to clipboard");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </Button>
            </Tooltip>
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-3">
        <span className="text-gray-400 text-sm">ETH BALANCE</span>
        <br />
        <span
          className={`text-white text-${isSmall ? "sm" : "md"} font-bold`}
          style={{ overflowWrap: "break-word" }}
        >
          {formattedBalance}
        </span>
      </div>
      {ethValue ? (
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
      ) : (
        <></>
      )}
    </Card>
  );
}

export default BalanceInfo;
