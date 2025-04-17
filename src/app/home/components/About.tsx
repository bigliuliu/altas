import { Africa, AtlasLogoAlt } from "@/constants/svg";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <main id="#About" className="lg:px-[5%] flex flex-col items-center py-10">
      <section className="flex flex-col md:flex-row justify-around items-start">
        <div className="bg-black/10 lg:p-4 h-full rounded-r-md">
          <Image src={Africa} alt="" className="hidden lg:block bg-cover" />
        </div>
        <article className="flex flex-col items-start font-DM w-full lg:w-[80%] p-3">
          <h1 className="font-semibold text-2xl sm:text-[48px] font-clashDisplay text-[#218B53] my-[10px]">
            | About us
          </h1>
          <h4 className="my-2 text-xl lg:text-2xl font-medium lg:leading-10">
            Atlas is a Kenyan based digital land registry service provider leveraging on blockchain technology
          </h4>
          <h5 className="mb-2">
            Atlas has a triple mission: to promote accessibility of land ownership records, improve transparency and reinforce property ownership rights in Kenya.
          </h5>
          <h5 className="mb-2">
            This mission is aimed at improving service delivery by employing the convenience of technology, anchoring the rule of law by helping to secure rights of bona fide landowners and ultimately anchoring trust in the real estate sector in Kenya.
          </h5>
          <h5 className="mb-2">
            We are banking on the decentralization (broad accessibility), immutability (tamper-proof nature) and security protocol of the blockchain to secure land records of walks of life in Kenya and well beyond.
          </h5>
          <h5 className="mb-2">
            Real estate is one of the most opaque and analogue sectors across the world. It is especially worse in developing countries like Kenya with endemic corruption makes it easier to forge title documents and dispossess bona fide owners off their hard-earned assets. Atlas is keen to incorporate technology into this space for better service delivery.
          </h5>

        </article>
      </section>
      <section className="bg-[#218B53] text-white w-full py-10 p-4 lg:p-6 lg:px-[10%] lg:text-center lg:text-lg font-bold">
        <h5 className="mb-2">
          Atlas seeks to kill two birds with one stone by digitizing and securing the digitized equivalents of land records on the blockchain for better security.
        </h5>
        <h5 className="mb-2">
          Digitization serves to improve the convenience of service accessibility by fetching search results instantaneously. This makes the due diligence a more effective experience devoid of unnecessary wait times and stamping out avenues for greasing.
        </h5>
        <h5 className="mb-2">
          Atlas therefore seeks to complement, act as a redundancy, as well as check, the existing land registry system in the country for the benefit of the citizenry.
        </h5>
      </section>
    </main>
  );
};

export default About;
