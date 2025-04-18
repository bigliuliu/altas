"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { List, XCircle } from "@phosphor-icons/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AtlasLogo, WhiteLogo } from "@/constants/svg";
import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [greenTheme, setGreenTheme] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollRef = useRef<HTMLDivElement | null>();

  useEffect(() => {
    const checkRoute = () => {
      const routes = [
        "/about",
        "/blog",
        "/resources",
        "/contact",
        "/services",
        "/properties",
      ];
      if (routes.includes(pathname)) {
        setGreenTheme(true);
      } else {
        setGreenTheme(false);
      }
    };

    checkRoute();
  }, [pathname]);

  return (
    <div className={`lg:px-[5%] ${greenTheme ? "bg-[#008D48]" : "mb-1 "}`}>
      <div className="flex justify-between items-center p-3 text-white">
        <div className=" w-auto flex items-center">
          <Image
            src={greenTheme ? WhiteLogo : AtlasLogo}
            alt="atlas-logo"
            className="w-[110px] h-[50px]"
          />
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
          <ul className="w-1/2 h-1/3 mx-auto text-center mt-[50%] flex flex-col sm:flex-row items-center justify-center text-lg  font-jakarta text-[#414651] font-semibold">
            <a
              href="/"
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Home
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-1 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              About
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Services
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Properties
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-3 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Blog
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Resources
            </a>
            <a
              onClick={() => {
                toggleMenu();
              }}
              className="my-2 mx-2 w-[100%] min-w-[100px] hover:text-[#218B53] hover:cursor-pointer "
            >
              Contact
            </a>
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <ul
            className={`flex flex-col sm:flex-row justify-center items-center gap-x-8 text-xl font-jakarta font-extrabold w-auto ${
              greenTheme ? "text-white" : "text-[#414651]"
            }`}
          >
            {[
              { label: "Home", href: "/home" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Properties", href: "/properties" },
              { label: "Blog", href: "/blog" },
              { label: "Resources", href: "/resources" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li
                key={label}
                className={`text-center min-w-[100px] hover:cursor-pointer ${
                  greenTheme ? "hover:text-white" : "hover:text-[#218B53]"
                } hover:underline underline-offset-4`}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          {greenTheme ? (
            <div>
              <Link
                href="/login"
                className="font-j font-semibold text-lg text-white mr-6"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#FFC107] py-2 px-3 rounded-lg  text-lg  font-jakarta text-black font-semibold"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#FFC107] py-2 px-3 rounded-lg  text-lg  font-jakarta text-black font-semibold"
            >
              Get started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
