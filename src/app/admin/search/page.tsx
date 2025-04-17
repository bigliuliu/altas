"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import AllProperty from "../property/AllProperty";

const Search = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article>
          <AllProperty status="sold" />
        </article>
      </main>
    </DashboardContainer>
  );
};

export default Search;
