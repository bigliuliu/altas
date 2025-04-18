// import { article } from "@/helpers/articleSource";
import React from "react";
import Article from "./Article";

const Articles = () => {
  return (
    <section className="bg-gradient-to-r from-[#258C4E] to-[#81DB64] md:py-10 py-4">
      <h1 className="font-semibold text-2xl sm:text-[48px] font-clashDisplay text-white my-10 flex justify-center">
        Articles
      </h1>
      <main className="p-4 flex overflow-x-scroll hide-scroll-bar">
      </main>
    </section>
  );
};

export default Articles;
