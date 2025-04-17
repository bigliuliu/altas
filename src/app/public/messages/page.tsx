"use client";

import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md h-full">
        <Message />
      </main>
    </DashboardContainer>
  );
};

export default Messages;
