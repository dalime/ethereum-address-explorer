import Web3 from 'web3';

/**
 * Fetches blockchain info about an Ethereum wallet address using infura
 * @param walletAddress string
 * @returns Response | null
 */
const fetchAddressInfo = async (walletAddress: string) => {
  const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
  const infuraUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;

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
}

export {
  fetchAddressInfo,
}