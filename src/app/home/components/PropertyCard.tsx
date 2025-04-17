import { Land } from "@/constants/png";
import { SealCheck } from "@phosphor-icons/react";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface PropertyCardType {
  svg: any;
  title: string;
  subtitle: string;
  size: number;
  type: string;
  image: StaticImageData;
  location: string;
}

const PropertyCard = ({
  svg,
  title,
  subtitle,
  size,
  type,
  image,
  location,
}: PropertyCardType) => {
  return (
    <article className="group flex flex-col justify-around items-center min-w-[350px] h-[450px] max-w-xs overflow-hidden rounded-2xl shadow-md bg-white  hover:shadow-xl transition-all delay-200 ease-in-out m-4 p-3 hover:translate-y-1">
      <div className="w-[400px] h-[200px] rounded-md">
        <Image src={image} width={400} height={200} alt="" className="bg-cover w-full h-full rounded-md group-hover:scale-110 transition-scale delay-200" />
      </div>
      <span className="flex flex-col items-start w-full">
        <h4 className="font-DM text-[16px] text-[#898CA9]">Title Number</h4>
        <h3 className="text-black font-clashDisplay text-[20px] font-semibold">
          {title}
        </h3>
      </span>
      <div className="flex w-full justify-between py-2">
        {/* <span>
          <h4 className="font-DM text-[16px] text-[#898CA9]">Size</h4>
          <h3 className="text-black font-clashDisplay text-[20px] font-semibold">
            {size} ACRES
          </h3>
        </span> */}
        <span>
          <h4 className="font-DM text-[16px] text-[#898CA9]">Type</h4>
          <h3 className="text-black font-clashDisplay text-[20px] font-semibold capitalize">
            {type}
          </h3>
        </span>
      </div>
      <button onClick={() => window.location.href = "/login"} className="mt-2 py-3 px-6 w-full font-semibold border border-[#218B53] rounded-full bg-[#218B53] text-white hover:cursor-pointer">
        Search Property
      </button>
    </article>
  );
};

export default PropertyCard;
