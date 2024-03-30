// Global imports
import React, { useState, FormEvent } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";

// Types
import { Transaction } from "@/types";

// Actions
import { fetchAddressInfo } from "@/actions";

interface Props {
  loading: boolean;
  setLoading(l: boolean): void;
  setWalletBalance(b: string | null): void;
  setWalletTransactions(t: Transaction[]): void;
}

function SearchInput({
  loading,
  setLoading,
  setWalletBalance,
  setWalletTransactions,
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
    }
  };

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
          className="bg-gray-700 text-white rounded-lg p-2 w-full"
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
