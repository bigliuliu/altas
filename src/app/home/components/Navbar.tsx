import Image from "next/image";
import React, { useState } from "react";
import { List, XCircle } from "@phosphor-icons/react";
import { AtlasLogo } from "@/constants/svg";
import Link from "next/link";
import { useRef } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollRef = useRef<HTMLDivElement | null>();

  return (
    <div className="lg:px-[5%]  mb-2">
      <div className="flex justify-between items-center p-3 text-white">
        <div className=" w-auto flex items-center">
          <Image src={AtlasLogo} alt="atlas-logo" className="w-auto" />
        </div>
        <div className="block lg:hidden">
          <List
            size={32}
            color="#b8b8b8"
            weight="fill"
            className="block lg:hidden"
            onClick={toggleMenu}
          />
        </div>
        <div
          className="fixed top-0 left-0 right-0 sm:block bg-[#15191C] p-5 sm:p-0 w-[100vw] h-[100vh] z-50 "
          style={showMenu ? { display: "block" } : { display: "none" }}
        >
          <XCircle
            size={32}
            color="#b8b8b8"
            weight="fill"
            onClick={toggleMenu}
          />
          <ul className="w-1/2 h-1/3 mx-auto text-center mt-[50%] flex flex-col sm:flex-row items-center justify-center text-lg font-DM text-[#A2A2A2]">
            <a
              href="/"
              onClick={() => {
                scrollRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Home
            </a>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 640,
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-1 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              About Us
            </a>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 2000,
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer ">
              Services
            </a>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 2500,
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer ">
              Properties
            </a>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 3000,
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer ">
              Blog
            </a>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 3550,
                  behavior: "smooth",
                });
                toggleMenu()
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer ">
              Contact Us
            </a>
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className=" flex flex-col sm:flex-row justify-around text-base font-DM text-[#A2A2A2] w-auto">
            <li

              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              Home
            </li>
            <a
              onClick={() => {
                window.scrollBy({
                  top: 640,
                  behavior: "smooth",
                });
              }}
              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              About Us
            </a>
            <li
              onClick={() => {
                window.scrollBy({
                  top: 1500,
                  behavior: "smooth",
                });
              }}
              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              Services
            </li>
            <li
              onClick={() => {
                window.scrollBy({
                  top: 2000,
                  behavior: "smooth",
                });
              }}
              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              Properties
            </li>
            <li
              onClick={() => {
                window.scrollBy({
                  top: 2700,
                  behavior: "smooth",
                });
              }}
              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              Blog
            </li>
            <li
              onClick={() => {
                window.scrollBy({
                  top: 3550,
                  behavior: "smooth",
                });
              }}
              className="mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer hover:underline underline-offset-4"
            >
              Contact Us
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="py-3 px-6 font-DM text-[#A2A2A2] hover:text-[#218B53]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="py-3 px-6 border border-[#218B53] rounded-full text-[#218B53] hover:cursor-pointer hover:bg-[#218B53] hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
