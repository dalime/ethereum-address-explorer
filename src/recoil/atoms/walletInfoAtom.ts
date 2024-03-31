import { atom } from 'recoil';

// Types
import { WalletInfo } from '@/types';

const defaultState: WalletInfo = {
  balance: null,
  nfts: [],
  transactions: [],
}

export const walletInfoState = atom<WalletInfo>({
  key: 'walletInfoState',
  default: defaultState,
});
