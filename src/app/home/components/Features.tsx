"use client";

import Image from "next/image";
import React from "react";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { Man, Security, Trans } from "@/constants/png";
import { useState } from "react";
import { featuresSource } from "@/helpers/featuresSource";
const Features = () => {
  const [spanNum, setSpanNum] = useState(1);
  return (
    <div className="w-full h-[816px] flex flex-col mt-24">
      <div className="w-1/2 grid grid-cols-3 font-jakarta font-semibold text-[#11171E]">
        <span
          className={`hover:cursor-pointer hover:underline underline-offset-8 ${
            spanNum === 1 ? "underline underline-offset-8" : ""
          }`}
          onClick={() => {
            setSpanNum(1);
          }}
        >
          Security
        </span>
        <span
          className={`hover:cursor-pointer hover:underline underline-offset-8 ${
            spanNum === 2 ? "underline underline-offset-8" : ""
          }`}
          onClick={() => {
            setSpanNum(2);
          }}
        >
          Transparency
        </span>
        <span
          className={`hover:cursor-pointer hover:underline underline-offset-8 ${
            spanNum === 3 ? "underline underline-offset-8" : ""
          }`}
          onClick={() => {
            setSpanNum(3);
          }}
        >
          Convenience
        </span>
      </div>
      <div className="w-full flex flex-row items-center justify-between text-[#11171E] ">
        {featuresSource.map((element, index) => {
          return element.id === spanNum ? (
            <React.Fragment key={index}>
              <div className="w-1/2 px-5">
                <p className="font-jakarta font-semibold text-4xl">
                  {element.title}
                </p>
                <p className="font-jakarta text-xl font-normal mt-12">
                  {element.description}
                </p>
              </div>
              <div className="w-1/2 flex justify-end">
                <Image
                  src={element.image}
                  alt=""
                  className="object-contain"
                ></Image>
              </div>
            </React.Fragment>
          ) : null;
        })}
      </div>
      <div className="w-32 grid grid-cols-2">
        <ArrowCircleLeft
          size={48}
          weight="thin"
          className={`${spanNum === 1 ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer'}`}
          color={spanNum === 1 ? "#D6DCE4" : "#11171E"}
          onClick={() => {
            if (spanNum === 1) return null;
            else {
              setSpanNum(spanNum - 1);
            }
          }}
        />
        <ArrowCircleRight
          size={48}
          weight="thin"
          className={`${spanNum === 3 ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer'}`}
          color={spanNum === 3 ? "#D6DCE4" : "#11171E"}
          onClick={() => {
            if (spanNum === 3) return null;
            else {
              setSpanNum(spanNum + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Features;
