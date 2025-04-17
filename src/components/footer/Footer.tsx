"use client";

import { AtlasLogoAlt } from "@/constants/svg";
import {
  FacebookLogo,
  InstagramLogo,
  XLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  if (isHomePage) return null;
  return (
    <footer className="px-24 py-12">
      <div className="grid grid-cols-3 gap-1">
        <div className="flex flex-col">
          <Image
            src={AtlasLogoAlt}
            alt="nexus-logo"
            className=""
            width={100}
            height={100}
          />
          <p className="font-jakarta text-base font-normal text-[#11171E] mt-8">
            Kenya&#39;s first blockchain-powered land <br />
            registry platform, providing security,
            <br />
            convenience, and transparency in land <br />
            management.
          </p>
          <span className="w-1/3 grid grid-cols-4 gap-1 pr-4 mt-8">
            <a rel="noopener noreferrer" href="#">
              <FacebookLogo weight="fill" size={24} color="#717680" />
            </a>
            <a rel="noopener noreferrer" href="#">
              <XLogo weight="fill" size={24} color="#717680" />
            </a>
            <a rel="noopener noreferrer" href="#">
              <InstagramLogo size={24} color="#717680" />
            </a>
            <a rel="noopener noreferrer" href="#">
              <LinkedinLogo size={24} color="#717680" />
            </a>
          </span>
        </div>
        <div className="flex flex-row items-center justify-around">
          <div className="flex flex-col">
            <p className="font-jakarta font-medium text-sm text-[#717680] mb-4">
              QuickLinks
            </p>
            <div className="font-jakarta font-normal text-base text-[#11171E] space-y-3 hover:cursor-pointer">
              <p>Home</p>
              <p>About Us</p>
              <p>Services</p>
              <p>Properties</p>
              <p>Resources</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-jakarta font-medium text-sm text-[#717680] mb-4">
              Services
            </p>
            <div className="font-jakarta font-normal text-base text-[#11171E] space-y-3 hover:cursor-pointer">
              <p>Enlist Property</p>
              <p>Verify Documents</p>
              <p>Land Search</p>
              <p>Transfer Ownership</p>
              <p>Dispute Resolution</p>
              <p>Encumbrance Registration</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-jakarta font-semibold text-sm text-[#717680] mb-4">
            Newsletter
          </p>
          <p className="font-jakarta font-normal text-base text-[#11171E] ">
            Subscribe to our newsletter for the latest updates on land
            management in Kenya.
          </p>
          <div className="flex flex-row mt-3">
            <input
              name="emailAddress"
              type="text"
              className="p-3 uppercase rounded-lg border border-[#D0D5DD] bg-[#A5A5A520] w-4/5 outline-none mr-4 text-[#808195]"
              placeholder="Enter email address"
            />
            <p className="bg-[#FFC107] mr-4 py-3 px-5 rounded-lg  text-lg  font-jakarta text-black font-semibold hover:cursor-pointer">
              Subscribe
            </p>
          </div>
          <p className="font-jakarta font-normal text-sm text-[#717680] mt-2">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 border-t border-[#ECEEF2] pt-8">
        <span className="mb-1 font-jakarta text-base font-normal text-[#717680]">
          © 2025 Atlas Kenya. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
