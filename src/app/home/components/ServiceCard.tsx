import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ServiceCard {
  svg: any;
  title: string;
  subtitle: string;
}

const ServiceCard = ({ svg, title, subtitle }: ServiceCard) => {
  return (
    <Link href="/login">
      <div className="w-96 h-80 border border-[#E9EBF8] rounded-3xl flex flex-col items-start justify-center px-8 hover:border-[#00A86B] hover:scale-105 transform transition-all duration-300 ease-in-out">
        <div className="w-16 h-16 bg-[#00A86B] rounded-xl flex justify-center items-center">
          <Image src={svg} width={32} height={32} alt={title}></Image>
        </div>
        <p className="font-jakarta text-xl text-[#11171E] font-semibold mt-10">
          {title}
        </p> 
        <p className="font-jakarta text-base text-[#535862] font-medium mt-4">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

export default ServiceCard;
