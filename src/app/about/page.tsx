import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Business, BusinessMan } from "@/constants/png";
import { CheckMark } from "@/constants/svg";
const About = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#008D48] flex flex-col items-center pt-24  text-white w-full h-[480px] text-center">
        <p className="mb-5 font-sans font-semibold text-5xl">A digital land registry service provider leveraging on blockchain technology </p>
      </div>
      <div className="px-24">
        <div className="w-full aspect-[1248/655] relative z-10 -mt-32 rounded-2xl overflow-hidden">
          <Image src={Business} alt="" fill className="object-cover" />
        </div>
        <div className="px-28 py-20 font-jakarta text-[#11171E] font-medium text-xl">
          <p>
            Atlas is a technology startup that is actively exploring ways to use
            blockchain technology to ensure data integrity. Our current area of
            focus is on the use of blockchain technology to secure the integrity
            of land records in Kenya. To this end, Atlas been building a
            blockchain powered platform that seeks to help property owners to
            digitize and secure their property records on the blockchain.
          </p>
          <p className="mt-8">
            Atlas is banking on the decentralization (broad accessibility),
            immutability (tamper-proof nature) and security protocol of the
            blockchain to secure land records of people from all walks of life
            in Kenya and beyond. Atlas is an example of an electronic land
            registry, which is anchored in law under Land Registration Act &
            Land Act 2012.
          </p>
        </div>
        <div className="flex flex-col py-6">
          <p className="font-sans font-semibold text-4xl text-[#11171E] mb-12">
            “Our mission is aimed at improving land due <br /> diligence through
            technology, securing <br /> rights of bona fide landowners and
            restoring <br /> trust in the real estate sector in Kenya.”
          </p>
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-3 gap-4">
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>
                Promote access to land records.
              </p>
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>
                Sensitize the public on land matters, policies, procedures -
                because knowledge is power.
              </p>
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>
                Improve the due diligence experience & rigour on land for better
                decision support.
              </p>
            </div>
            <div className="grid grid-rows-3">
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>{" "}
                Reinforce property (ownership) rights in Kenya.
              </p>
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>{" "}
                Improve transparency of land ownership.
              </p>
              <p className="flex flex-row items-center">
                <Image
                  src={CheckMark}
                  width={28}
                  height={28}
                  alt=""
                  className="mr-3"
                ></Image>
                Complement government land registry framework by offering an
                alternative point of reference for land records, as a redundancy
                to Government of Kenya registries.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[520px] rounded-[40px] bg-[#008D48] flex flex-row items-center my-24">
          <div className="w-7/12 flex flex-col px-20 text-white">
            <p className="font-sans font-semibold text-4xl">Partner with Us</p>
            <p className="font-jakarta font-normal text-[18px] mt-5 mb-16">
              Strategic market penetration alliances being sought with leading
              land selling companies including but not limited to AMG Realtors,
              Optiven, among others.
            </p>
            <p className="font-jakarta font-normal text-[18px]">
              Our partnership program offers numerous benefits including access
              to our extensive resources, co-branding opportunities, and the
              ability to reach a wider audience.
            </p>
            <Link
              href="/Contact"
              className="w-32 bg-[#FFC107] py-3 px-3 rounded-lg text-lg font-jakarta text-black font-semibold mt-10"
            >
              Contact us
            </Link>
          </div>

          <div className="w-5/12 h-[520px] relative rounded-rt-[40px] rounded-rb-[40px]">
            <Image
              src={BusinessMan}
              alt="Business Man"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
