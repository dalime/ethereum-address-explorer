/**
 * Tests if a string is a valid ETH address
 * @param address string
 * @returns booleans
 */
export const isValidEthAddress = (address: string): boolean => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};