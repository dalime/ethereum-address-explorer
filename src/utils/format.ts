/**
 * Formats a number into USD
 * @param number 
 * @returns string
 */
export const formatUSD = (number: number): string => {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return `${formattedNumber} USD`;
};

/**
 * Formats an amount in ETH to 4 decimal places + " ETH"
 * @param number number | bigint
 * @returns string
 */
export const formatETH = (number: number | bigint): string => {
  const numericValue = typeof number === 'bigint' ? Number(number) : number;

  const formattedValue = parseFloat(numericValue.toFixed(4));

  const finalAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(formattedValue);

  return `${finalAmount} ETH`;
};

/**
 * Formats an address to be human-readable
 * @param address string
 * @returns string
 */
export const shrinkAddress = (address: string): string => {
  const startLength = 6;
  const endLength = 7;
  if (address.length <= startLength + endLength) {
    return address; // Return the original address if it's too short
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}