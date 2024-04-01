import React from "react";
import { useRecoilState } from "recoil";
import { Progress } from "@nextui-org/react";

import { walletInfoState } from "@/recoil/atoms";

function LoadingMessage() {
  const [walletInfo] = useRecoilState(walletInfoState);

  return (
    <div style={{ marginTop: walletInfo ? 0 : 40 }}>
      <h2 className={`text-white mb-3 text-2lg font-semibold text-center`}>
        Loading...
      </h2>
      <Progress
        size="lg"
        style={{ width: 200 }}
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  );
}

export default LoadingMessage;
