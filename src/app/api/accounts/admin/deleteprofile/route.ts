import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function DELETE(request: any) {
    const { profile_id, token } = await request.json();
    try {
        const res = await fetch(`${AtlasBackendApi}/admin/users/${profile_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        return res;
    } catch (error) {
        console.log("error verification", error);
    }

}
