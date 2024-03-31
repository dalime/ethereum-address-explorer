import { atom } from 'recoil';

export const ethPriceState = atom<number | null>({
  key: 'ethPriceState',
  default: null,
});
