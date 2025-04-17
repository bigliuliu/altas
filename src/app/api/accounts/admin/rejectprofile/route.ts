import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function POST(request: any) {
  const { profile_id,token} = await request.json();
  try {
    const res = await fetch(`${AtlasBackendApi}/admin/rejectProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        profile_id:profile_id,
      }),
    });
    
    
  
    return res;
  } catch (error) {
    console.log("error verification", error);
  }

  
}
