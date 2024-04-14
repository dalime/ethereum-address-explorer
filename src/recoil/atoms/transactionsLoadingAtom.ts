import { atom } from 'recoil';

export const transactionsLoadingState = atom<boolean>({
  key: 'transactionsLoadingState',
  default: false,
});

