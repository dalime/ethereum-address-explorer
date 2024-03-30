// Global imports
import React, { useState, FormEvent } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";

// Types
import { Transaction, NFTData } from "@/types";

// Actions
import { fetchAddressInfo } from "@/actions";

// Utils
import { isValidEthAddress } from "@/utils";

interface Props {
  loading: boolean;
  setLoading(l: boolean): void;
  setWalletBalance(b: string | null): void;
  setWalletTransactions(t: Transaction[]): void;
  setWalletNfts(n: NFTData[]): void;
}

function SearchInput({
  loading,
  setLoading,
  setWalletBalance,
  setWalletTransactions,
  setWalletNfts,
}: Props) {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const walletInfo = await fetchAddressInfo(walletAddress);
    setLoading(false);
    if (walletInfo) {
      console.log("fetched wallet info", walletInfo);
      setWalletBalance(walletInfo.balance);
      setWalletTransactions(walletInfo.transactions);
      setWalletNfts(walletInfo.nfts);
    }
  };

  const isInvalid = React.useMemo(() => {
    if (walletAddress === "") return false;

    return isValidEthAddress(walletAddress) ? false : true;
  }, [walletAddress]);

  return (
    <form
      className="flex flex-col gap-4 bg-gray-800 rounded-lg shadow-lg w-full"
      onSubmit={submitForm}
    >
      <div className="py-2">
        <label htmlFor="walletAddress" className="text-gray-400 block">
          Wallet Address
        </label>
        <Input
          type="text"
          id="walletAddress"
          name="walletAddress"
          // className="bg-gray-700 text-white rounded-lg p-2 w-full"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          errorMessage={isInvalid && "Please enter a valid ETH address"}
          placeholder="0x..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Explore"}
      </Button>
    </form>
  );
}

export default SearchInput;
