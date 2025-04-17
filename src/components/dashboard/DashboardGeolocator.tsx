'use client'

import Map from "@/components/maps/Map";
import { DotsThree } from "@phosphor-icons/react";
import React from "react";

const DashboardGeolocator = ({coordinates}:{coordinates?:any}) => {
  return (
    <main className="m-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Geolocator</h3>
        <DotsThree size={24} color="#080808" />
      </div>
      <hr className="text-[#E6E8F0] my-5" />
      <Map coordinates={coordinates} />
    </main>
  );
};

export default DashboardGeolocator;
