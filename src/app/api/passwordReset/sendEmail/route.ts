import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";
// import User from '@/models/User'
// import connect from '@/utils/db'
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import bcrypt from "bcryptjs";
export async function POST(request: any) {
  const { email,newPassword } = await request.json();
  try {
    const res = await fetch(`${AtlasBackendApi}/resetPasswordPhoneNumber/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        newPassword: newPassword
        
      }),
    });
    console.log("api res", res);

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
