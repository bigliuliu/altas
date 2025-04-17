"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "./components/articleCard";
import { Business } from "@/constants/png";
import { article } from "@/helpers/articleSource";
import { ArrowLeft } from "@phosphor-icons/react";
import { StaticImageData } from "next/image";

interface CurrentArticle {
  image?: string | StaticImageData;
  title?: string;
  date?: string;
  description?: string;
  content?: string;
}

const Blog = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<CurrentArticle>({
    image: '',
    title: '',
    date: '',
    description: '',
    content: '',
  });

  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#008D48] flex flex-col pt-24 pl-24  text-white w-full h-[340px]">
        <p className="font-jakarta text-base font-semibold text-[#FFC107] mb-3">
          Blog
        </p>
        <p className="mb-5 font-sans font-semibold text-5xl">
          Stay Updated on Land & Property Essentials
        </p>
        <p className="font-jakarta text-xl font-normal">
          Fresh perspectives on transparency, security, and property rights
        </p>
      </div>
      {isShowDetail ? (
        <div className="text-[#11171E] p-24 flex flex-col items-center">
          <span
            onClick={() => {
              setIsShowDetail(false);
              setCurrentArticle({});
            }}
            className="self-start text-xl font-semibold text-[#008D48] flex items-center mb-16 hover:cursor-pointer"
          >
            <ArrowLeft size={25} className=" pr-1  " />
            Back
          </span>
          <p className="font-sans text-center text-4xl font-semibold text-[#11171E] mb-7">
            {currentArticle.title}
          </p>
          {currentArticle.image && (
            <div className="relative w-[800px] h-[400px]">
              <Image src={currentArticle.image} alt="" fill className="object-cover" />
            </div>
          )}
          <div
            className="prose mt-9 font-jakarta px-96 [&>p]:mt-5  [&>ul]:mt-3 [&>h2]:mt-3 [&>h2]:text-2xl [&>h2]:font-semibold"
            dangerouslySetInnerHTML={{ __html: currentArticle.content || '' }}
          />
        </div>
      ) : (
        <div className="p-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-12">
          {article.map((element, index) => (
            <ArticleCard
              key={index}
              image={element.image}
              content={element.content}
              title={element.title}
              description={element.description}
              date={element.date}
              showContent={() => {
                setIsShowDetail(true);
                setCurrentArticle(element);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
