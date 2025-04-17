"use client";

import { AtlasLogo, Earth } from "@/constants/svg";
import { Info } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

interface Props {
  children: JSX.Element;
}

const AuthContainer = ({ children }: Props) => {
  return (
    <section className="bg-auth-bg bg-no-repeat bg-cover text-white">
      <nav className="flex items-center justify-between px-5">
        <span className="flex items-center">
          <Image src={AtlasLogo} alt="atlas-logo" />
          <h2 className="text-4xl font-bold">Atlas</h2>
        </span>
        <h3 className="flex">
          <Info size={20} color="#00C9A7" weight="bold" /> Need Help?
        </h3>
      </nav>
      <main className="flex flex-col md:flex-row md:items-center  md:h-screen  justify-around">
        {/* Left Hero Image */}
        <div>
          <Image src={Earth} alt="hero-image" />
        </div>

        {/* Right Form Content */}
        {children}
      </main>
    </section>
  );
};

export default AuthContainer;
