import { atom } from 'recoil';

// Types
import { WalletInfo } from '@/types';

/**
 * Looks for saved wallet info in sessionStorage
 * @returns WalletInfo | null
 */
const getSessionWalletInfo = (): WalletInfo | null => {
  const sessionWalletInfo = sessionStorage.getItem("ethWalletInfo");
  if (sessionWalletInfo !== null) {
    try {
      return JSON.parse(sessionWalletInfo) as WalletInfo;
    } catch (error) {
      console.error('Error parsing sessionStorage item:', error);
      return null;
    }
  }
  return null;
}

export const walletInfoState = atom<WalletInfo | null>({
  key: 'walletInfoState',
  default: getSessionWalletInfo(),
});
