"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContainer from "@/container/DashboardContainer";
import React, { useEffect } from "react";
import AllProperty from "./AllProperty";

const Property = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article>
          <Tabs defaultValue="properties" className="w-auto">
            <TabsList>
              <TabsTrigger value="properties">All Properties</TabsTrigger>
              <TabsTrigger value="waiting">Recently Added</TabsTrigger>
              <TabsTrigger value="processing">Pending Verification</TabsTrigger>
              <TabsTrigger value="verified">Verified Properties</TabsTrigger>
              <TabsTrigger value="rejected">Rejected Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <AllProperty status="all" />
            </TabsContent>
            <TabsContent value="waiting">
              <AllProperty status="waiting" />
            </TabsContent>
            <TabsContent value="verified">
              <AllProperty status="verified" />
            </TabsContent>
            <TabsContent value="processing">
              <AllProperty status="processing" />
            </TabsContent>
            <TabsContent value="rejected">
              <AllProperty status="rejected" />
            </TabsContent>
          </Tabs>
        </article>
      </main>
    </DashboardContainer>
  );
};

export default Property;
