import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function GET(request: any) {
  const { 
   token } = await request.json();

  try {
    const res = await fetch(`${AtlasBackendApi}/public/userProperties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
      
    });
    
  
    return res;
  } catch (error) {
    console.log("error", error);
  }

  
}
