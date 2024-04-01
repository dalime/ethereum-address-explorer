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
 * @returns number | null
 */
export const parseTransactionValue = (data: string): number | null => {
  if (data) {
    const amountBigInt = BigInt(data);
    const tokenDecimals = 18;
    const amount = Number(amountBigInt) / 10 ** tokenDecimals;
    return amount;
  } else {
    return null;
  }
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


/**
 * Converts the value from Etherscan to readable ETH amount
 * @param value string
 * @returns string
 */
export const formatValueToEth = (value: string): string => {
  const wei: bigint = BigInt(value);
  const conversionFactor: bigint = BigInt(1e18);

  // Convert Wei to ETH. Use BigInt arithmetic for precision and convert the result to a number for formatting.
  const ethValue: number = Number(wei) / Number(conversionFactor);

  // Determine the number of decimal places
  let formattedEthValue: string;
  if (ethValue < 1) {
    // If the ETH value is less than 1, format with up to 6 decimal places
    formattedEthValue = ethValue.toFixed(6);
  } else {
    // If the ETH value is 1 or more, format with up to 4 decimal places
    formattedEthValue = ethValue.toFixed(4);
  }

  // Append " ETH" and return
  return `${formattedEthValue} ETH`;
}

/**
 * Calculates gas fee in ETH by using value, gasUsed, and gasPrice
 * @param gasUsed string
 * @param gasPrice string
 * @returns string
 */
export const calculateGasFeeInEth = (gasUsed: string, gasPrice: string): string => {
  // Convert gasUsed and gasPrice from string to bigint for accurate multiplication
  const usedGas = BigInt(gasUsed);
  const priceGas = BigInt(gasPrice);

  // Calculate the total cost in Wei
  const totalCostWei = usedGas * priceGas;

  // Convert the total cost to ETH by dividing by 10^18 (1e18)
  const totalCostETH = Number(totalCostWei) / 1e18;

  // Format the result to a string with appropriate decimal places
  // If less than 1 ETH, show up to 6 decimal places, otherwise show up to 4 decimal places
  const formattedCost = totalCostETH < 1 ? totalCostETH.toFixed(6) : totalCostETH.toFixed(4);

  return formattedCost;
}