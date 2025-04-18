import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "./propertyCard";
const Properties = () => {
  const properties = [
    {
      parcel: "NAIROBI/WESTLANDS",
      block: "3D/17",
      acreage: 3.75,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1736862694/66c97c0f05698dfdff2e4afd/de9irumyngwqtnsjwkts.jpg",
    },
    {
      parcel: "NAIROBI/UPPERHILL",
      block: "2A/09",
      acreage: 1.25,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1719644789/uvn0nblx59m4y13bpxpb.jpg",
    },
    {
      parcel: "NAIROBI/CBD",
      block: "1A/05",
      acreage: 7.25,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1719645127/onptkb0tiesrtwfffjmi.jpg",
    },
    {
      parcel: "BOMET/SILIBWET",
      block: "4D/15",
      acreage: 3.5,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1720460434/l2kek0kplmnh6zps3knh.jpg",
    },
    {
      parcel: "Laikipia/Nanyuki",
      block: "3A/09",
      acreage: 1.8,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1720463872/wha71pofatlwzoxhn6s1.jpg",
    },
    {
      parcel: "KAKAMEGA/NAVAKHOLO",
      block: "3E/23",
      acreage: 12.5,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1721249532/j9cgguw8ev9t7huktxcg.jpg",
    },
    {
      parcel: "TAITA-TAVETA/TSAVO",
      block: "4K/22",
      acreage: 15,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1721404155/jrfuvzw4tvpjmazgrubd.jpg",
    },
    {
      parcel: "NAROK/TOTAL",
      block: "2A/33",
      acreage: 2.25,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1721421436/hg7qhzdlbauxwhrfhgar.jpg",
    },
    {
      parcel: "NAROK/LEMEK",
      block: "3G/11",
      acreage: 8.5,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1722265855/cndzehtdg5tvzrfhx2t1.jpg",
    },
    {
      parcel: "NAIROBI/KAREN",
      block: "3G/22",
      acreage: 10.5,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1722530228/mz4ocl2obqpou1cmifhp.jpg",
    },
    {
      parcel: "KIAMBU/THIKA",
      block: "4D/15",
      acreage: 15,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1722565375/nhntkmcurpwnaeym9um4.jpg",
    },
    {
      parcel: "NAIROBI/KASARANI",
      block: "2B/15",
      acreage: 6.25,
      imgUrl:
        "https://res.cloudinary.com/dgrajdspl/image/upload/v1724065672/rjdph1dgxmbusis8do4h.jpg",
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#008D48] flex flex-col pt-24 pl-24  text-white w-full h-[340px]">
        <p className="font-jakarta text-base font-semibold text-[#FFC107] mb-3">
          Properties
        </p>
        <p className="mb-5 font-sans font-semibold text-5xl">
        A database of properties secured on the blockchain powered by Atlas
        </p>
      </div>
      <div className="px-24  py-12 grid grid-cols-4 gap-4">
        {properties.map((element, index) => {
          return (
            <PropertyCard
              key={index}
              acreage={element.acreage}
              block={element.block}
              imgUrl={element.imgUrl}
              parcel={element.parcel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Properties;
