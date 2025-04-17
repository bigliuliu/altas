"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
interface ArticleCard {
  image: any;
  title: string;
  date: string;
  description: string;
  content: string;
  showContent:()=>void;
}

const ArticleCard = ({
  image,
  title,
  date,
  description,
  content,
  showContent,
}: ArticleCard) => {
  return (
    <div className="flex flex-col w-96 h-[451px] justify-between">
      
      <div className="relative w-96 h-[260px] ">
        <Image src={image} alt="" fill className="object-cover rounded-2xl" />
      </div>

      <p className="pt-4 font-sans font-semibold text-[18px] text-[#11171E]">
        {title}
      </p>
      <p className="font-jakarta font-normal text-base text-[#11171E]">
        {description}
      </p>
      <div className="pt-6 flex flex-row justify-between font-jakarta">
        <span className="text-sm text-[#5C5C5C]">{date}</span>
        <span onClick={showContent} className="text-base font-semibold text-[#008D48] flex items-center hover:cursor-pointer">
          Read Post <ArrowUpRight size={20} className=" pl-1" />
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
