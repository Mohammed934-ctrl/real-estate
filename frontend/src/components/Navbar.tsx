"use client";

import React from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      {/* Navbar */}
      <div className="flex justify-between items-center bg-primary-700  w-full py-3 px-8  text-white">
        <div className="flex  items-center  gap-4 md:gap-6 ">
          <Link
            href="/"
            scroll={false}
            className="cursor-pointer hover:text-primary-300!"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="estate-hub"
                height={27}
                width={27}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold">
                ESTATE
                <span className="text-secondary-600 font-light hover:text-primary-300!">
                  HUB
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-primary-300 font-semibold hidden md:block">
          Discover your perfect rental apartment with our advanced search
        </p>
        <div className="flex gap-5 items-center ">
          <Link href="/signin">
            <Button
              className= "text-white bg-transparent hover:bg-white border-white hover:text-primary-700  rounded-lg"
              variant="outline"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className=" text-white bg-transparent  border-white hover:bg-secondary-600  rounded-lg"
              variant="outline"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
