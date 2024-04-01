import { atom } from 'recoil';

// Utils
import { pageWasReloaded } from '@/utils';

/**
 * Looks for saved wallet address in sessionStorage
 * @returns string
 */
const getSessionWalletAddress = (): string => {
  const wasReloaded = pageWasReloaded();
  if (wasReloaded) {
    sessionStorage.removeItem("ethWalletAddress");
    sessionStorage.removeItem("lastSelectedTab");
    return "";
  }

  const sessionWalletAddress = sessionStorage.getItem("ethWalletAddress");
  if (sessionWalletAddress !== null) {
    try {
      return sessionWalletAddress as string;
    } catch (error) {
      console.error('Error parsing sessionStorage item:', error);
      return "";
    }
  }
  return "";
}

export const walletAddressState = atom<string>({
  key: 'walletAddressState',
  default: getSessionWalletAddress(),
});
