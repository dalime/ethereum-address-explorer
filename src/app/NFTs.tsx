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
    <div>
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
          <Card key={`nft-${index}`}>
            <p>{name}</p>
            {nftMetadata ? (
              <Image
                src={nftMetadata.image}
                alt={`Preview of ${nftMetadata.name}`}
                width={100}
              />
            ) : (
              <></>
            )}
          </Card>
        );
      })}
    </div>
  );
}

export default NFTs;
