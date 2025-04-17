"use client"

import { DashboardOverview } from "@/constants/svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroSlider from "./hero-slider";

const HeroSection = () => {
  return (
    <main className="text-center h-[70vh] bg-[#258C4E] overflow-hidden">
      <HeroSlider />
    </main>
  );
};

export default HeroSection;
