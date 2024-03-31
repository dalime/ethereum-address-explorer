// Global imports
import React from "react";
import { Card, Image } from "@nextui-org/react";

// Types
import { NFTData, NFTMetadata } from "@/types";

// Utils
import { parseNFTMetadata } from "@/utils";

interface Props {
  nftList: NFTData[];
}

function NFTs({ nftList }: Props) {
  return (
    <div className="container mx-auto" style={{ marginTop: 20 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
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
            <Card
              key={`nft-${index}`}
              style={{ width: "100%", padding: "1rem" }}
            >
              <h3>{name}</h3>
              {nftMetadata ? (
                <>
                  <Image
                    src={nftMetadata.image}
                    alt={`Preview of ${nftMetadata.name}`}
                    width={100}
                  />
                  {nftMetadata.fiatPrice && (
                    <p>Fiat Price: {nftMetadata.fiatPrice}</p>
                  )}
                  {nftMetadata.ethPrice && (
                    <p>ETH Price: {nftMetadata.ethPrice} ETH</p>
                  )}
                </>
              ) : (
                <p>Metadata unavilable</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default NFTs;
