import React, { CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { Progress, Image } from "@nextui-org/react";

// Recoil
import { walletInfoState } from "@/recoil/atoms";

// Images
import EthLogo from "../../public/eth-logo.png";

function LoadingMessage() {
  const [walletInfo] = useRecoilState(walletInfoState);

  const isSmall = useMediaQuery({ maxWidth: 640 });

  const absoluteStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  const baseStyle: CSSProperties = {
    marginTop: walletInfo ? 0 : 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const style: CSSProperties =
    isSmall && walletInfo ? { ...absoluteStyle, ...baseStyle } : baseStyle;

  return (
    <div style={style}>
      {walletInfo && (
        <Image
          src={EthLogo.src}
          alt="Ethereum"
          width={60}
          style={{ width: 60, height: "auto", marginBottom: 20 }}
        />
      )}
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
