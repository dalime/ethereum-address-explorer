// Global imports
import React, { useState, useMemo, FormEvent } from "react";
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
  flat?: boolean;
  mobile?: boolean;
}

function SearchInput({
  loading,
  setLoading,
  setWalletBalance,
  setWalletTransactions,
  setWalletNfts,
  flat,
  mobile,
}: Props) {
  const [walletAddress, setWalletAddress] = useState<string>("");

  /**
   * Submits the form
   * @param e FormEvent<HTMLFormElement>
   */
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

  /**
   * Checks if walletAddress is valid ETH address using utils
   */
  const isInvalid = useMemo(() => {
    if (walletAddress === "") return false;

    return isValidEthAddress(walletAddress) ? false : true;
  }, [walletAddress]);

  /**
   * Renders submit button
   * @returns JSX.Element
   */
  const renderSubmitBtn = (): JSX.Element => (
    <Button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
      disabled={loading}
      style={flat ? { marginLeft: 10 } : {}}
    >
      {loading ? <Spinner /> : "Explore"}
    </Button>
  );

  return (
    <form
      className={`flex flex-${
        flat ? "row" : "col"
      } gap-4rounded-lg shadow-lg w-full`}
      onSubmit={submitForm}
    >
      <div className={`py-2 ${flat ? "flex justify-center align-center" : ""}`}>
        {!flat && (
          <label htmlFor="walletAddress" className="text-gray-400 block">
            Wallet Address
          </label>
        )}
        <Input
          type="text"
          id="walletAddress"
          name="walletAddress"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          errorMessage={isInvalid && "Please enter a valid ETH address"}
          placeholder="0x..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          disabled={loading}
        />

        {flat && renderSubmitBtn()}
      </div>

      {!flat && renderSubmitBtn()}
    </form>
  );
}

export default SearchInput;
