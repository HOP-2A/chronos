"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  return (
    <header
      className={`flex items-center justify-emd w-full fixed top-0 z-50 transition-colors duration-300 rounded-b-2xl ${
        scrolled ? "bg-[#2e5d4d] shadow" : "bg-transparent"
      }`}
    >
      <div className="mr-5 flex justify-end">
        <SignedOut>
          <SignUpButton>
            <Button
              variant="ghost"
              className="bg-pink-400 text-white hover:bg-purple-300 hover:text-white cursor-pointer "
            >
              Нэвтрэх
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />  
        </SignedIn>
      </div>
    </header>
  );
};
export default Header;
