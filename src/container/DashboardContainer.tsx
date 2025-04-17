"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import SideMenu from "@/components/menu/SideMenu";
import { useAppContext } from "@/context/AppContext";
import React from "react";

interface Props {
  children: JSX.Element;
}

const DashboardContainer = ({ children }: Props) => {
  const { isCollapseNavMenu, setCollapseNavMenu } = useAppContext();

  return (
    <section className="flex w-full min-h-screen overflow-auto transition-all duration-300 ease-in-out font-DM">
      <SideMenu />
      <main
        style={
          isCollapseNavMenu ? { marginLeft: "230px" } : { marginLeft: "90px" }
        }
        className=" w-screen bg-[#FAFAFA] transition-all duration-300 ease-in-out overflow-hidden"
      >
        <DashboardNav />
        {children}
      </main>
    </section>
  );
};

export default DashboardContainer;
