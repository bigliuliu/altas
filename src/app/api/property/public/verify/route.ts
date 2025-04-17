import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function POST(request: any) {
  const { 
   property_id,token } = await request.json();
  try {
    const res = await fetch(`${AtlasBackendApi}/public/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        property_id:property_id
      }),
    });
    
  console.log("api res",res)
    return res;
  } catch (error) {
    console.log("error", error);
  }

  //await connect();
  // const existingUser = await User.findOne({phoneNumber});
  // if(existingUser){
  //   return new NextResponse("phoneNumber already in use",{
  //     status:400
  //   });
  // }
  // const hashPassword = await bcrypt.hash(password,5);
  // const newUser = new User({
  //  fullName: fullName,
  //   password: hashPassword,
  //    phoneNumber: phoneNumber,
  //    role:role,

  // });

  // try{
  //   await newUser.save();
  //   return new NextResponse("User is registerd",{
  //     status:200
  //   });

  // }catch(error:any){
  //   return  new NextResponse(error,{
  //     status:500,
  //   })
  // }
  // return  NextResponse.json({hello:"world"})
}
