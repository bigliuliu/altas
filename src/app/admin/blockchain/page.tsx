"use client"

import DashboardContainer from "@/container/DashboardContainer";
import AllProperty from "./property-table";

export default function BlockchainPage() {
    return (
        <DashboardContainer>
            <main className="m-3 rounded-lg p-3 bg-white shadow-md">
                <div>
                    <h1>
                        Properties stored in blockchain contracts
                    </h1>
                </div>
                <AllProperty status="verified" />
            </main>
        </DashboardContainer>
    )
}