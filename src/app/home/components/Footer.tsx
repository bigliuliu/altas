import { AtlasLogoAlt } from "@/constants/svg";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="xsm:p-4 text-[#898CA9] ">
      <div className="container grid grid-cols-1 xsm:grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <Image
            src={AtlasLogoAlt}
            alt="nexus-logo"
            className=""
            width={100}
            height={100}
          />
          <footer>
            Atlas is a Kenyan based digital land registry service provider leveraging on blockchain technology.
          </footer>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-2xl text-[#218B53] font-clashDisplay">
            Resources
          </h2>
          <div className="flex flex-col space-y-2 text-sm text-[#898CA9] ">
            <a rel="noopener noreferrer" href="#">
              Help Center
            </a>
            <a rel="noopener noreferrer" href="#">
              Platform Status
            </a>
            <a rel="noopener noreferrer" href="#">
              Partners
            </a>
            <a rel="noopener noreferrer" href="#">
              Jobs
            </a>
            <a rel="noopener noreferrer" href="#">
              Blog
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-2xl text-[#218B53] font-clashDisplay">
            Company
          </h2>
          <div className="flex flex-col space-y-2 text-sm text-[#898CA9] ">
            <a rel="noopener noreferrer" href="#">
              Our Team
            </a>
            <a rel="noopener noreferrer" href="#">
              About Us
            </a>
            <a rel="noopener noreferrer" href="#">
              Contact Us
            </a>
            <a rel="noopener noreferrer" href="#">
              Career
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-2xl text-[#218B53] font-clashDisplay">
            Contact
          </h2>
          <div className="flex flex-col space-y-2 text-sm text-[#898CA9] ">
            <a rel="noopener noreferrer" href="#">
              Caxton House, Nairobi CBD
            </a>
            <span className="flex">
              <a rel="noopener noreferrer" href="#">
                <FacebookLogo size={24} color="#0CAF60" />
              </a>
              <a rel="noopener noreferrer" href="#">
                <TwitterLogo size={24} color="#0CAF60" />
              </a>
              <a rel="noopener noreferrer" href="#">
                <InstagramLogo size={24} color="#0CAF60" />
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row  items-start justify-around px-6 pt-12 text-sm">
        <span className="mb-1">© Copyright 2024. All Rights Reserved.</span>
        <span className="mb-1">Community guidelines</span>
        <span className="mb-1">Terms</span>
        <span className="mb-1">Privacy policy</span>
      </div>
    </footer>
  );
};

export default Footer;
