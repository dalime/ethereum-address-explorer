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
 * @param number number
 * @returns string
 */
export const formatETH = (number: number): string => {
  let amountStr = number.toString();
  const decimalIndex = amountStr.indexOf('.');

  if (decimalIndex !== -1) {
    const decimals = amountStr.substring(decimalIndex + 1, decimalIndex + 5);
    const trimmedDecimals = decimals.replace(/0+$/, ''); // Remove trailing zeros
    amountStr = amountStr.substring(0, decimalIndex) + (trimmedDecimals.length > 0 ? '.' + trimmedDecimals : '');
  }

  let [integerPart] = amountStr.split('.');
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const finalAmount = amountStr.includes('.') ? integerPart + amountStr.substring(amountStr.indexOf('.')) : integerPart;
  return finalAmount + ' ETH';
};