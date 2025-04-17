"use client"

import DashboardContainer from "@/container/DashboardContainer"
import { SavedResult } from "./savedResults"
import { useSession } from "next-auth/react"
import { AtlasBackendApi } from "@/constants/atlas-backend-api"
import { useQuery } from "@tanstack/react-query";

export default function SavedSearch() {
    const { data: session } = useSession();
    const token = session?.user.accesstokens as unknown as string;
    const getAllSavedSearch = async () => {
        const res = await fetch(`${AtlasBackendApi}/public/getAllSavedSearches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "omit",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch saved search");
        }
        return res.json();
    };

    const { data = [], error, isLoading } = useQuery({
        queryKey: ["savedsearch"],
        queryFn: getAllSavedSearch,
        enabled: !!token,
    });

    console.log("saved search data", data);

    return (
        <DashboardContainer>
            <main className="flex m-3 rounded-lg p-3 bg-white shadow-md">
                <SavedResult data={data} />
            </main>
        </DashboardContainer>
    )
}