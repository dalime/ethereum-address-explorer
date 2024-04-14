export interface Transaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string[];
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}

export interface WalletInfo {
  balance: string | null;
  transactions: Transaction[];
  transactionsPage: number;
  nfts: NFTData[];
}

export interface NFTData {
  amount: number;
  token_id: number;
  token_address: string;
  contract_type: string;
  owner_of: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: NFTMetadata | null;
  block_number: string;
  block_number_minted: string | null;
  name: string;
  symbol: string;
  token_hash: string;
  token_uri: string;
  minter_address: string;
  verified_collection: boolean;
  possible_spam: boolean;
  collection_logo: string;
  collection_banner_image: string;
}

export interface NFTMetadata {
  minter: string;
  mintedOn: string;
  contractAddress: string;
  minted: string;
  fiatPrice: string;
  name: string;
  description: string;
  youtube_url: string;
  price: number;
  ethPrice: string;
  amountToMint: number;
  visibility: string;
  forSale: boolean;
  image: string
  attributes:{
    trait_type: string;
    value: string;
  }[];
  category: string;
  external_url: string;
  type: string;
}