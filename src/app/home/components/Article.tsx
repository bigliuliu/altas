import Image from "next/image";
import React from "react";

interface Article {
  image: any;
  title: string;
  date: string;
  link: string;
}

const Article = ({ image, title, date, link }: Article) => {
  return (
    <a target="_blank" href={link} className="group w-full m-2 p-4 rounded-md flex flex-col justify-around bg-white hover:translate-y-1 transition-all delay-100">
      <Image src={image} alt="" className="h-[200px] min-w-[300px] group-hover:scale-105" width={300} height={200} />
      <h4 className="my-3 font-DM font-semibold group-hover:text-[#258C4E] group-hover:underline">{title}</h4>
      <p className="text-opacity-20 font-DM group-hover:text-[#258C4E]">{date}</p>
    </a>
  );
};

export default Article;
