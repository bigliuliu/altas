import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "@/types/types";

import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export async function POST(request: any) {
  const {
    phoneNumber,
    titleLR,
    county,
    registrationSection,
    blockNumber,
    parcelNumber,
    sizeHa,
    ownerName,
    leaseType,
    acquistionType,
    encumbrance,
    landRateBalance,
    propertyTitleDeed,
    propertyImage,
    userType,
    acquisitionDate,
    propertyCoordinate, propertyAlias, motherTitle } = await request.json();
  console.log("date date console is ", acquisitionDate);

  // phoneNumber,
  //     titleLR,
  //     county,
  //     registrationSection,
  //     blockNumber,
  //     parcelNumber,
  //     sizeHa,
  //     ownerName,
  //     leaseType,
  //     acquistionType,
  //     encumbrance,
  //     landRateBalance,
  //     propertyTitleDeed,
  //     propertyImage,
  //     propertyCoordinate,
  //     acquisitionDate,        
  //     userType

  const res = await fetch(`${AtlasBackendApi}/public/enlistProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
      titleLR: titleLR,
      county: county,
      registrationSection: registrationSection,
      blockNumber: blockNumber,
      parcelNumber: parcelNumber,
      sizeHa: sizeHa,
      ownerName: ownerName,
      leaseType: leaseType,
      acquistionType: acquistionType,
      encumbrance: encumbrance,
      landRateBalance: landRateBalance,
      propertyTitleDeed: propertyTitleDeed,
      propertyImage: propertyImage,
      userType: userType,
      acquisitionDate: acquisitionDate,
      propertyCoordinate: propertyCoordinate,
      propertyAlias: propertyAlias,
      motherTitle
    }),
  });


  return res;


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
