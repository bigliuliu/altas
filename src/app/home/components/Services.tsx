import { serviceSource } from "@/helpers/serviceSource";
import React from "react";
import ServiceCard from "./ServiceCard";
interface ServiceProps {
  isShowTitle?: boolean;
}

const Services = ({ isShowTitle = true }: ServiceProps) => {
  return (
    <section className="w-full h-auto bg-[linear-gradient(141.36deg,_#FFFFFF_34.96%,_#B0E4D1_195.6%)] py-24">
      {isShowTitle ? (
        <p className="font-sans font-semibold text-4xl text-[#11171E] mb-16">
          Atlas has carefully selected a suite of services in <br /> tandem with
          the most critical land administration <br /> functions.
        </p>
      ) : (
        ""
      )}

      <main className="grid grid-cols-3 gap-12">
        {serviceSource.map((element, index) => {
          const isLast = index === serviceSource.length - 1;
          const shouldCenter = isLast && serviceSource.length % 3 === 1;

          return (
            <div
              key={index}
              className={
                shouldCenter
                  ? "col-span-3 flex justify-center"
                  : "flex justify-center"
              }
            >
              <ServiceCard
                svg={element.image}
                subtitle={element.subtitle}
                title={element.title}
              />
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default Services;
