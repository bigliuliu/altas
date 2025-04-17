"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import { Chrono } from "react-chrono";

const Audit = () => {
  const items = [
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property was Enlisted",
      cardSubtitle: "ENFORCER: Samir Patel",
      cardDetailedText: "The Property was Enlisted by Samir Patel",
    },
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property was Verified",
      cardSubtitle: "ENFORCER: Nakuru Lands Registrar ",
      cardDetailedText: "The Property was Verified by Nakuru Lands Registrar ",
    },
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property was Transferred",
      cardSubtitle: "ENFORCER: Samir Patel",
      cardDetailedText: "The Property was Transferred by Samir Patel",
    },
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property was Encumbered",
      cardSubtitle: "ENFORCER: Nakuru Lands Registrar",
      cardDetailedText: "The Property was Encumbered by Nakuru Lands Registrar",
    },
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property was Updated",
      cardSubtitle: "ENFORCER: Atlas",
      cardDetailedText: "The Property was Updated by Atlas",
    },
    {
      title: "DATETIME: August 15, 2023. 9.22 am",
      cardTitle: "ACTION: Property Encumbered Lifted",
      cardSubtitle: "ENFORCER: Nakuru Lands Registrar",
      cardDetailedText:
        "The Property Encumbered Lifted by Nakuru Lands Registrar",
    },
  ];

  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md h-full">
        <table className="w-full border border-black p-2">
          <tr className=" border border-black p-2">
            <th className=" border border-black p-2">Title Number</th>
            <th className=" border border-black p-2">
              LR NAKURU / MILIMANI / 3A / 15
            </th>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">County / R. Section</td>
            <td className=" border border-black p-2">NAKURU / MILIMANI</td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">
              Block No. / Parcel No.{" "}
            </td>
            <td className=" border border-black p-2">3A / 15</td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">Size (Ha) </td>
            <td className=" border border-black p-2">0.5 HA </td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">Title type</td>
            <td className=" border border-black p-2">LEASEHOLD</td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">
              Lease type (If leasehold title){" "}
            </td>
            <td className=" border border-black p-2">RESIDENTIAL</td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">Geo-coordinates</td>
            <td className=" border border-black p-2">
              1° 17&apos; 11.0004&apos; S and 36° 49&apos; 2.0028&apos; E
            </td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">Encumbrances</td>
            <td className=" border border-black p-2">-</td>
          </tr>
          <tr className=" border border-black p-2">
            <td className=" border border-black p-2">Registered Owner </td>
            <td className=" border border-black p-2">SAMIR PATEL</td>
          </tr>
        </table>
        <Chrono
          items={items}
          mode="VERTICAL"
          cardHeight="100"
          className="p-5"
          theme={{
            primary: "#218B53",
            secondary: "#218B53",
            cardBgColor: "white",
            cardTitleColor: "#218B53",
            titleColor: "black",
            titleColorActive: "white",
          }}
        />
      </main>
    </DashboardContainer>
  );
};

export default Audit;
