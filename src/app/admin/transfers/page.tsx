import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import AllTransfers from "../../../components/table/TransferTable/AllTransfers";

const Transfers = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <AllTransfers />
      </main>
    </DashboardContainer>
  );
};

export default Transfers;
