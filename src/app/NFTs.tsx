// Global imports
import React, { CSSProperties, useState } from "react";
import { Card, Image, Button, Tooltip } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

// Types
import { NFTData, NFTMetadata } from "@/types";

// Utils
import { parseNFTMetadata, formatETH, shrinkAddress } from "@/utils";

// Images
import PlaceholderImg from "../../public/placeholder-img.png";
import NFTPagination from "./NFTPagination";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  style: CSSProperties;
  noImage?: boolean;
}

const ImageWithFallback = ({
  src,
  alt,
  style,
  noImage,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState<string>(src);

  const fallbackSrc = PlaceholderImg.src;

  const handleError = () => setImageSrc(fallbackSrc);

  // Use the onError event of a hidden img element to detect loading errors
  return (
    <Tooltip
      color="foreground"
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold text-white">View full image</div>
        </div>
      }
    >
      <Button
        style={{
          width: "100%",
          height: "100%",
          maxHeight: 265,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: 0,
          padding: 0,
          paddingRight: 0,
          margin: 0,
          marginRight: 0,
          gap: "initial",
        }}
        onClick={() => (src ? (window.location.href = src) : {})}
      >
        {noImage && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Image Not Available
          </p>
        )}
        <Image
          src={src}
          alt={alt}
          height={265}
          style={{
            width: "100%",
            height: 265,
            objectFit: "cover",
            borderRadius: 0,
            ...style,
          }}
          onError={handleError}
        />
        <Image
          src={src}
          alt={alt}
          onError={handleError}
          style={{ display: "none" }}
        />
      </Button>
    </Tooltip>
  );
};

interface Props {
  nftList: NFTData[];
  nftPage: number;
}

function NFTs({ nftList, nftPage }: Props) {
  // Media queries for pagination
  const oneColumn = useMediaQuery({ maxWidth: 640 });
  const twoColumns = useMediaQuery({ maxWidth: 1024 });
  const threeColumns = useMediaQuery({ maxWidth: 1280 });

  /**
   * Renders view in OpenSea button
   * @param tokenAddress string
   * @param tokenId number
   * @returns JSX.Element
   */
  const renderOpenSeaBtn = (
    tokenAddress: string,
    tokenId: number
  ): JSX.Element => (
    <Tooltip
      color="foreground"
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold text-white">View in OpenSea</div>
        </div>
      }
    >
      <Button
        color="secondary"
        onClick={() =>
          (window.location.href = `https://opensea.io/assets/${tokenAddress}/${tokenId}`)
        }
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
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>{" "}
        OpenSea
      </Button>
    </Tooltip>
  );

  // Set page size based on how wide the screen is
  const pageSize = oneColumn ? 3 : twoColumns ? 6 : threeColumns ? 9 : 12;

  const endIndex = nftPage * pageSize;
  const begIndex = endIndex - pageSize;
  const subArr = nftList.slice(begIndex, endIndex).map((nftItem) => nftItem);

  return (
    <div className="container mx-auto" style={{ marginTop: 20 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {subArr.map((nft, index) => {
          const { name, metadata, token_address, token_id } = nft;
          let nftMetadata: NFTMetadata | null = null;
          if (typeof metadata === "string") {
            nftMetadata = parseNFTMetadata(metadata);
          } else {
            nftMetadata = metadata as NFTMetadata;
          }
          return (
            // Apply min-w-[200px] to ensure a minimum width of 200px for the card
            <Card
              key={`nft-${index}`}
              className="min-w-[200px] w-full"
              style={{ padding: 0, margin: 0 }}
            >
              {nftMetadata ? (
                <>
                  {nftMetadata.image ? (
                    <ImageWithFallback
                      src={nftMetadata.image}
                      alt={`Preview of ${nftMetadata.name}`}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={PlaceholderImg.src}
                      alt="Placeholder image"
                      style={{ width: "100%", height: 265, objectFit: "cover" }}
                    />
                  )}
                  <div className="flex justify-between items-start px-4 mb-3 mt-3">
                    <div className="flex-1">
                      {name ? (
                        <div>
                          <span className="text-gray-400 text-sm">NAME</span>
                          <br />
                          <span className="text-white text-md font-bold">
                            {name}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-gray-400 text-sm">#</span>
                          <br />
                          <span className="text-white text-md font-bold">
                            {shrinkAddress(token_id.toString())}
                          </span>
                        </div>
                      )}
                      <div className="mt-3">
                        {renderOpenSeaBtn(token_address, token_id)}
                      </div>
                    </div>
                    <div className="flex-1" style={{ marginLeft: 5 }}>
                      {nftMetadata.fiatPrice && (
                        <div>
                          <span className="text-gray-400 text-sm">
                            FIAT PRICE
                          </span>
                          <br />
                          <span className="text-white text-md font-bold">
                            {nftMetadata.fiatPrice}
                          </span>
                        </div>
                      )}
                      {nftMetadata.ethPrice && (
                        <div className="mt-3">
                          <span className="text-gray-400 text-sm">
                            ETH PRICE
                          </span>
                          <br />
                          <span className="text-white text-md font-bold">
                            {formatETH(parseInt(nftMetadata.ethPrice, 10))}
                          </span>
                        </div>
                      )}
                      {nftMetadata.name && (
                        <div
                          className={
                            nftMetadata.fiatPrice || nftMetadata.ethPrice
                              ? "mt-3"
                              : ""
                          }
                        >
                          <span className="text-gray-400 text-sm">
                            ENS NAME
                          </span>
                          <br />
                          <span className="text-white text-md font-bold">
                            {nftMetadata.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: 265,
                      position: "relative",
                      background: "#3f3f46",
                    }}
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      Image Not Available
                    </p>
                  </div>
                  <div className="flex justify-between items-start px-4 mb-3 mt-3">
                    <div className="flex-1">
                      <div>
                        <span className="text-gray-400 text-sm">NAME</span>
                        <br />
                        <span className="text-white text-md font-bold">
                          {name}
                        </span>
                      </div>
                      <div className="mt-3">
                        {renderOpenSeaBtn(token_address, token_id)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>
      <NFTPagination />
    </div>
  );
}

export default NFTs;
