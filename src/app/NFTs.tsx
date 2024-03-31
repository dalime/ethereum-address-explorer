// Global imports
import React, { CSSProperties, useState, useEffect } from "react";
import { Card, Image } from "@nextui-org/react";

// Types
import { NFTData, NFTMetadata } from "@/types";

// Utils
import { parseNFTMetadata, formatETH } from "@/utils";

// Images
import PlaceholderImg from "../../public/placeholder-img.png";

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
    <div
      style={{
        width: "100%",
        height: 265,
        position: "relative",
        overflow: "hidden",
      }}
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
          height: "auto",
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
    </div>
  );
};

interface Props {
  nftList: NFTData[];
}

function NFTs({ nftList }: Props) {
  const fallbackImage = "https://example.com/path/to/fallback/image.png";

  return (
    <div className="container mx-auto" style={{ marginTop: 20 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {nftList.map((nft, index) => {
          const { name, metadata } = nft;
          console.log("nft metadata", metadata, ", typeof", typeof metadata);
          let nftMetadata: NFTMetadata | null = null;
          if (typeof metadata === "string") {
            nftMetadata = parseNFTMetadata(metadata);
          } else {
            nftMetadata = metadata as NFTMetadata;
          }
          console.log("metadata", nftMetadata);
          return (
            // Apply min-w-[200px] to ensure a minimum width of 200px for the card
            <Card key={`nft-${index}`} className="min-w-[200px] w-full">
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
                  <div className="flex justify-between items-start px-4 mb-3">
                    <div className="flex-1">
                      <div>
                        <span className="text-gray-400 text-sm">NAME</span>
                        <br />
                        <span className="text-white text-md font-bold">
                          {name}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ width: "100%", height: 265, position: "relative" }}
                  >
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
                  </div>
                  <div className="p-4 mb-3">
                    <div className="flex-1">
                      <div>
                        <span className="text-gray-400 text-sm">NAME</span>
                        <br />
                        <span className="text-white text-md font-bold">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default NFTs;
