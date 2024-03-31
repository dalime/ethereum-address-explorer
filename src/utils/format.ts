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
}
