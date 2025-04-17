import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import Dispute from "./DisputeTable/Dispute";


const Disputes = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article>
          <Tabs defaultValue="raised" className="w-auto">
            <TabsList>
              <TabsTrigger value="raised">Disputes Raised</TabsTrigger>
              <TabsTrigger value="resolved">Disputes Resolved</TabsTrigger>
              <TabsTrigger value="pending">Disputes Pending </TabsTrigger>
              <TabsTrigger value="rejected">Disputes Rejected </TabsTrigger>
            </TabsList>
            <TabsContent value="raised">
              <Dispute status="enlisted" />
            </TabsContent>
            <TabsContent value="pending">
              <Dispute status="underaudit" />
            </TabsContent>
            <TabsContent value="resolved">
              <Dispute status="verified" />
            </TabsContent>
            <TabsContent value="rejected">
              <Dispute status="rejected" />
            </TabsContent>
          </Tabs>
        </article>
      </main>
    </DashboardContainer>
  );
};

export default Disputes;
