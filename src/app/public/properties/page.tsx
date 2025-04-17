

import DashboardContainer from "@/container/DashboardContainer";

import AllProperties from "./AllProperties";

const Properties = () => {
  return (
    <DashboardContainer>
      <main className="m-3 rounded-lg p-3 bg-white shadow-md">
        <AllProperties />
      </main>
    </DashboardContainer>
  );
};

export default Properties;
