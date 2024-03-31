// Global imports
import Web3 from 'web3';

// Types
import { NFTData, NFTMetadata, WalletInfo } from '@/types';

// Utils
import { parseNFTMetadata } from '@/utils';

// Instantiate infura info used by all of these functions
const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const infuraUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;

/**
 * Fetches the wallet balance for an Ethereum wallet address using Infura
 * @param walletAddress string
 * @returns string | null
 */
const fetchWalletBalance = async (walletAddress: string) => {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [walletAddress, 'latest'],
    id: 1,
  };

  try {
    const response = await fetch(infuraUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (!data.error && data.result) {
      const balanceInEther = Web3.utils.fromWei(data.result, 'ether');
      console.log('balance in ether', balanceInEther);
      return balanceInEther;
    } else {
      console.error('Error fetching balance:', data.error?.message);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


/**
 * Fetches the transaction history for an Ethereum wallet address using Etherscan
 * @param walletAddress string
 * @returns string | null
 */
const fetchWalletTransactions = async (walletAddress: string) => {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=logs&action=getLogs&address=${walletAddress}&page=1&offset=20&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    if (data.result) {
      console.log('transactions result', data.result);
      return data.result;
    }
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return null;
  }
}

/**
 * Fetches NFTs owned by a wallet address
 * @param walletAddress string
 * @returns NFTData[]
 */
const fetchNFTsForWallet = async (walletAddress: string) => {
  const url = `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft?chain=eth&format=decimal&media_items=false`; // Your Moralis server URL

  try {
    const response = await fetch(url, { method: 'GET', headers: {
      "Accept": 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
    } });
    const data = await response.json();
    const results = data.result as NFTData[];
    const finalResults = results.map((result) => ({ ...result, metadata: result.metadata ? typeof result.metadata === "string" ? parseNFTMetadata(result.metadata) : result.metadata as NFTMetadata : null }));
    console.log('NFTS Owned:', finalResults);
    return finalResults || [];
  } catch (error) {
    console.error("Failed to fetch NFTs:", error);
    return [];
  }
};

/**
 * Fetches the latest price of ETH
 * @returns number | null
 */
const fetchEthPrice = async () => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || "";
  const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if(data.status === "1") {
      console.log('Current ETH Price in USD:', data.result.ethusd);
      return data.result.ethusd;
    } else {
      console.error('Failed to fetch ETH price:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return null;
  }
};

/**
 * Fetches blockchain info about an Ethereum wallet address using infura
 * @param walletAddress string
 * @returns WalletInfo
 */
const fetchAddressInfo = async (walletAddress: string) => {
  try {
    const walletBalance = await fetchWalletBalance(walletAddress);
    const walletTransactions = await fetchWalletTransactions(walletAddress);
    const walletNFTs = await fetchNFTsForWallet(walletAddress);

    const returnObj: WalletInfo = {
      balance: walletBalance,
      transactions: walletTransactions,
      nfts: walletNFTs,
    }

    return returnObj;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export {
  fetchAddressInfo,
  fetchEthPrice,
}