export interface Transaction {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  gasPrice: string;
  gasUsed: string;
  logIndex: string;
  timeStamp: string;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}

export interface WalletInfo {
  balance: string | null;
  transactions: Transaction[];
}