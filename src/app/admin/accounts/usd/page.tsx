"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import CashOutflowUsd from "../../components/CashOutflowUsd/CashOutflowUsd";
import CashInflowUsd from "../../components/CashInflowUsd/CashInflowUsd";
import DashboardUsd from "@/components/dashboard/DashboardUsd";

const Usd = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardUsd />
        <CashInflowUsd />
        <CashOutflowUsd />
      </>
    </DashboardContainer>
  );
};

export default Usd;
