/**
 * Parses addresses from a topics array
 * @param topics string[]
 * @returns { fromAddress: string; toAddress: string; }
 */
export const parseAddresses = (topics: string[]): { fromAddress: string; toAddress: string; } => {
  if (topics && topics.length === 3) {
    const fromAddress = `0x${topics[1].slice(26)}`;
    const toAddress = `0x${topics[2].slice(26)}`;
    return {
      fromAddress,
      toAddress,
    };
  } else {
    return {
      fromAddress: "",
      toAddress: "",
    };
  }
};

/**
 * Parses the amount of a transaction in ETH
 * @param data string
 * @returns number
 */
export const parseTransactionValue = (data: string): number => {
  const tokenDecimals = 18; // Common for many tokens like ETH, but check for each token
  const valueDec = parseInt(data, 16);
  const tokenAmount = valueDec / Math.pow(10, tokenDecimals);
  return tokenAmount;
};

/**
 * Parses the gas fee in ETH from gas used hash and gas price hash
 * @param gasUsedHex string
 * @param gasPriceHex string
 * @returns number
 */
export const parseGasFee = (gasUsedHex: string, gasPriceHex: string): number => {
  const gasUsed = parseInt(gasUsedHex, 16);
  const gasPrice = parseInt(gasPriceHex, 16);
  const gasFeeWei = gasUsed * gasPrice;
  const gasFeeEther = gasFeeWei / 1e18;
  return gasFeeEther;
};
