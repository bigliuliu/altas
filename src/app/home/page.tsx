"use client";

import React from "react";
import Services from "./components/Services";
import Contact from "./components/ContactUs";
import AtlasFAQ from "./components/FAQ";
import Introduce from "./components/Introduce";
import Features from "./components/Features";


const Home = () => {
  return (
    <section className="bg-white text-black px-24 pt-4">
      <Introduce/>
      <Features/>
      <Services />
      <AtlasFAQ />
      <Contact />
    </section>
  );
};

export default Home;
