"use client";

import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import CashInflowKes from "../../components/CashInflowKes/CashInflowKes";
import CashOutflowKes from "../../components/CashOutflowKes/CashOutflowKes";

const Kes = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashInflowKes />
        <CashOutflowKes />
      </>
    </DashboardContainer>
  );
};

export default Kes;
