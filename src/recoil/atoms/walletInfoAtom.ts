import { atom } from 'recoil';

// Types
import { WalletInfo } from '@/types';

export const walletInfoState = atom<WalletInfo | null>({
  key: 'walletInfoState',
  default: null,
});
