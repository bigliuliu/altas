import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function POST(request: any) {
  const { 
    title,county,size,recipientID,attachDocument,accessToken } = await request.json();
  try {
    const res = await fetch(`${AtlasBackendApi}/public/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        title, 
        county, 
        size, 
        recipientID, 
        attachDocument
      }),
    });

    //console.log("trnafer response",await res.json())
    
  
    return res;
  } catch (error) {
    console.log("error trans", error);
  }

}