"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import Account from "./Account";
import Transactions from "./Transactions";

const Wallet = () => {
  return (
    <DashboardContainer>
      <main className="m-2 flex flex-col justify-around items-start">
        <Account />
        <Transactions />
      </main>
    </DashboardContainer>
  );
};

export default Wallet;
