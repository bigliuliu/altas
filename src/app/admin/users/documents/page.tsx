import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Documents = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article className="w-full p-2">
          <table className="w-full border border-black p-2">
            <tr className=" border border-black p-2">
              <th className=" border border-black p-2">Title Number</th>
              <th className=" border border-black p-2">
                LR NAKURU / MILIMANI / 3A / 15
              </th>
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
              <td className=" border border-black p-2">Owner </td>
              <td className=" border border-black p-2">SAMIR PATEL</td>
            </tr>
            <tr className=" border border-black p-2">
              <td className=" border border-black p-2">Acquisition date</td>
              <td className=" border border-black p-2">JUNE 07, 2013</td>
            </tr>
            <tr className=" border border-black p-2">
              <td className=" border border-black p-2">Acquisition type </td>
              <td className=" border border-black p-2">
                99 YEAR LOCAL AUTHORITY LEASE{" "}
              </td>
            </tr>
          </table>
        </article>
        <article className="p-3">
          <button className=" py-3 px-5 w-auto bg-[#218B531A]  bg-[#218B53] text-white rounded-lg hover:font-semibold">
            Download Documents
          </button>
        </article>
      </main>
    </DashboardContainer>
  );
};

export default Documents;
