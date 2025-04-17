"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React, { useState } from "react";
import AllProperties from "./AllProperties";

const SearchPage = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <AllProperties />
      </main>
    </DashboardContainer>
  );
};

export default SearchPage;
