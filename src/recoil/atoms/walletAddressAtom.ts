import { atom } from 'recoil';

export const walletAddressState = atom<string>({
  key: 'walletAddressState',
  default: '',
});
