import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
interface CardType {
  parcel: string;
  block: string;
  acreage: number;
  imgUrl: string;
}
const PropertyCard = ({ parcel, acreage, imgUrl, block }: CardType) => {
  return (
    <div className="w-64 h-64 py-5 px-3 flex flex-col justify-between bg-[#F9FAFB]">
      <div className="relative w-full h-[150px] rounded-lg">
        <Image
          fill
          src={imgUrl}
          alt="property"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="font-jakarta">
        <p className="flex flex-row justify-between ">
          <span className="text-base text-[#171717]">{parcel}</span>
          <span className="text-sm text-[#5C5C5C]">{block}</span>
        </p>
        <p className="flex flex-row justify-between text-[#5C5C5C] ">
          <span>{acreage}HA</span>
          <ArrowRight size={20} className=" pl-1" />
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
