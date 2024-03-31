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
  Link,
} from "@nextui-org/react";

// Recoil
import { ethPriceState } from "@/recoil/atoms";

// Components
import SearchInput from "./SearchInput";

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
            <p className="font-bold text-inherit">
              ETH Price: {Math.round(ethPrice * 100) / 100} USD
            </p>
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
