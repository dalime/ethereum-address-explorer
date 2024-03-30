// Types
import { NFTMetadata } from "@/types";

/**
 * Parses NFT metadata from string to recognizable interface
 * @param jsonString string
 * @returns NFTMetadata
 */
export const parseNFTMetadata = (jsonString: string): NFTMetadata | null => {
  try {
    const parsedData: NFTMetadata = JSON.parse(jsonString);
    console.log('parsedData', parsedData);
    return parsedData;
  } catch (error) {
    console.error("Failed to parse JSON string into NFTMetadata", error);
    return null;
  }
};