import React from "react";
import AllUsers from "./AllUsers";
import DashboardContainer from "@/container/DashboardContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Users = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <article>
          <Tabs defaultValue="users" className="w-auto">
            <TabsList>
              <TabsTrigger value="users">All Accounts</TabsTrigger>
              <TabsTrigger value="waiting">Basic Accounts</TabsTrigger>
              <TabsTrigger value="verified">Verified Accounts</TabsTrigger>
              <TabsTrigger value="rejected">Rejected Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <AllUsers status="all" />
            </TabsContent>
            <TabsContent value="waiting">
              <AllUsers status="waiting" />
            </TabsContent>
            <TabsContent value="verified">
              <AllUsers status="verified" />
            </TabsContent>
            <TabsContent value="rejected">
              <AllUsers status="rejected" />
            </TabsContent>
          </Tabs>
        </article>
      </main>
    </DashboardContainer>
  );
};

export default Users;
