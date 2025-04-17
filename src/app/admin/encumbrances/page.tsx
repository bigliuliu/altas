import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";
import Dispute from "./EncumbranceTable/Encumbrance";


const Encumbrances = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article>
          <Tabs defaultValue="raised" className="w-auto">
            <TabsList>
              <TabsTrigger value="raised">Encumbrances Raised</TabsTrigger>
              <TabsTrigger value="resolved">Encumbrances Resolved</TabsTrigger>
              <TabsTrigger value="pending">Encumbrances Pending </TabsTrigger>
              <TabsTrigger value="rejected">Encumbrances Rejected </TabsTrigger>
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

export default Encumbrances;
