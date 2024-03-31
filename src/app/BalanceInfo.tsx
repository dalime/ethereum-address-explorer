import React from "react";

interface Props {
  walletBalance: string;
}

function BalanceInfo({ walletBalance }: Props): JSX.Element {
  return (
    <div>
      <h2>Balance: {walletBalance}</h2>
    </div>
  );
}

export default BalanceInfo;
