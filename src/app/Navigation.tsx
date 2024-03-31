import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
} from "@nextui-org/react";

// Recoil
import { ethPriceState } from "@/recoil/atoms";

// Utils
import { formatUSD } from "@/utils";

// Components
import SearchInput from "./SearchInput";

// Images
import EthLogo from "../../public/eth-logo.png";

export default function Navigation() {
  const [ethPrice] = useRecoilState(ethPriceState);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const renderSearchInput = (desktop: boolean): JSX.Element => (
    <SearchInput flat={desktop} mobile={!desktop} />
  );

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {ethPrice && (
            <div className="flex items-center space-x-1">
              {" "}
              {/* Adjust space as needed */}
              <Image
                src={EthLogo.src}
                alt="Ethereum"
                width={30}
                className="inline-block"
              />
              <span className="font-bold text-inherit">
                ETH Price: {formatUSD(ethPrice)}
              </span>
            </div>
          )}
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
