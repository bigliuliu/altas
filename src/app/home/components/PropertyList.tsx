import { property } from "@/helpers/propertySource";
import React from "react";
import PropertyCard from "./PropertyCard";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";

const PropertyList = () => {

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${AtlasBackendApi}/public/allVerifiedProperties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const { data: properties, error, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });


  return (
    <section className="md:py-10 py-4">
      <main className="flex flex-col items-center text-center">
        <h1 className="font-semibold text-3xl sm:text-[48px] font-clashDisplay text-[#218B53] my-[10px]">
          List Your Own property!
        </h1>
      </main>
      <div className="flex overflow-x-scroll hide-scroll-bar">
        {properties !== undefined && properties.map((element: any) => {
          return (
            <PropertyCard
              key={element._id}
              svg={element.propertyImage}
              title={element.titleLR}
              subtitle={element.subtitle}
              size={element.sizeHa}
              type={element.leaseType}
              image={element.propertyImage}
              location={element.registrationSection}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PropertyList;
