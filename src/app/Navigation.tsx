import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

// Types
import { Transaction, NFTData } from "@/types";

// Components
import SearchInput from "./SearchInput";

interface Props {
  loading: boolean;
  setLoading(l: boolean): void;
  setWalletBalance(b: string | null): void;
  setWalletTransactions(t: Transaction[]): void;
  setWalletNfts(n: NFTData[]): void;
}

export default function Navigation({
  loading,
  setLoading,
  setWalletBalance,
  setWalletTransactions,
  setWalletNfts,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const renderSearchInput = (desktop: boolean): JSX.Element => (
    <SearchInput
      loading={loading}
      setLoading={setLoading}
      setWalletBalance={setWalletBalance}
      setWalletTransactions={setWalletTransactions}
      setWalletNfts={setWalletNfts}
      flat={desktop}
      mobile={!desktop}
    />
  );

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Ethereum Address Explorer</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>{renderSearchInput(true)}</NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>{renderSearchInput(false)}</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
