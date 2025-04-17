import React from "react";
import { signIn } from "next-auth/react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
type sendOtp = {
  phoneNumber?: string;
  email_address?: string;
};

type enlistProperty = {
  phoneNumber: string,
  titleLR: string,
  county: string,
  registrationSection: string,
  blockNumber: string,
  parcelNumber: string,
  sizeHa: string,
  ownerName: string,
  leaseType: string,
  acquistionType: string,
  encumbrance: string,
  landRateBalance: string,
  propertyTitleDeed: string,
  propertyImage: string
  userType: string,
  acquisitionDate: string | undefined,
  propertyCoordinate: string
  propertyAlias: string,
  motherTitle: string
}


type dataVerifyOtp = {
  phoneNumber?: string;
  otp: string;
};

type dataRegisterUser = {
  phoneNumber: string;
  fullName: string;
  password: string;
  role: string;
  entity: string;
  email: string;
  inviter: string | null;
  promo_code: string | null
};

type passwordReset = {
  email: string,
  newPassword: string
}

type propertyId = {
  id: string
}


type dataSignInUser = {
  phoneNumber: string;
  password: string;
};

type transferProp = {
  idNumber: string,
  landReferenceNumber: string,
  approvalDate: string,
  requestDate: string,
  attachDocument: string,
  accessToken: string
}

export const SendAfricaOTP = async (otpsend: sendOtp) => {
  console.log(otpsend)
  try {
    const res = await fetch("/api/africaStalking/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: otpsend.phoneNumber,
        countryCode: "254",
      }),
    });
    return res;
  } catch (error) {
    console.log("Error sendig an otp", error);
  }
};

export const VerifyAfricaOTP = async (details: dataVerifyOtp) => {
  // handleOTP confirmation here
  try {
    const res = await fetch("/api/africaStalking/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: details.phoneNumber,
        countryCode: "254",
        otp: details.otp,
      }),
    });
    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }

  //setOpen(false);
};





export const VerifyOTP = async (details: dataVerifyOtp) => {
  // handleOTP confirmation here
  try {
    const res = await fetch("/api/twilio/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: details.phoneNumber,
        countryCode: "254",
        otp: details.otp,
      }),
    });
    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }

  //setOpen(false);
};




export const SignInUser = async (userDetails: dataSignInUser) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      phoneNumber: userDetails.phoneNumber,
      password: userDetails.password,
    });
    return res;
  } catch (error) {
    console.log("failed to signinUser", error);
  }
};

export const SignUpUser = async (userDetails: dataRegisterUser) => {
  try {
    const res = await fetch("/api/accounts/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: userDetails.phoneNumber,
        fullName: userDetails.fullName,
        password: userDetails.password,
        role: userDetails.role,
        entity: userDetails.entity,
        email: userDetails.email,
        inviter: userDetails.inviter,
        promo_code: userDetails.promo_code
      }),
    });
    return res;
  } catch (error) {
    console.log("failed to register", error);
  }
};

export const SendOTP = async (otpsend: sendOtp) => {
  try {
    const res = await fetch("/api/twilio/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: otpsend.phoneNumber,
        countryCode: "254",
      }),
    });
    return res;
  } catch (error) {
    console.log("Error sendig an otp", error);
  }
};



export const SendPasswordReset = async (reset: passwordReset) => {
  // handleOTP confirmation here
  try {
    const res = await fetch("/api/passwordReset/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: reset.email,
        newPassword: reset.newPassword
      }),
    });
    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }

  //setOpen(false);
};



export const EnlistPropert = async (propertyDetail: enlistProperty) => {
  // handleOTP confirmation here

  const res = await fetch("/api/property/public/enlistProperty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: propertyDetail.phoneNumber,
      titleLR: propertyDetail.titleLR,
      propertyAlias: propertyDetail.propertyAlias,
      county: propertyDetail.county,
      registrationSection: propertyDetail.registrationSection,
      blockNumber: propertyDetail.blockNumber,
      parcelNumber: propertyDetail.parcelNumber,
      sizeHa: propertyDetail.sizeHa,
      ownerName: propertyDetail.ownerName,
      leaseType: propertyDetail.leaseType,
      acquistionType: propertyDetail.acquistionType,
      encumbrance: propertyDetail.encumbrance,
      landRateBalance: propertyDetail.landRateBalance,
      propertyTitleDeed: propertyDetail.propertyTitleDeed,
      propertyImage: propertyDetail.propertyImage,
      userType: propertyDetail.userType,
      acquisitionDate: propertyDetail.acquisitionDate,
      propertyCoordinate: propertyDetail.propertyCoordinate,
      motherTitle: propertyDetail.motherTitle
    }),
  });
  return res;

  //setOpen(false);
};


export const getAllEnlistedProperty = async (accessToken: string) => {
  // handleOTP confirmation here
  try {
    const res = await fetch("/api/property/admin/getAllProperties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },


    });
    return res;
  } catch (err) {
    console.log("failed to fetch all Properties", err);
  }

  //setOpen(false);
};


//verify property user

export const VerifyPropertyById_Public = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/property/public/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};

//get all user properties
export const getAllUserProperties = async (jwtToken: string) => {
  try {
    const res = await fetch(`/api/property/public/userProperty`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};


export const TransferProperty = async (
  title: string,
  county: string,
  size: string,
  recipientID: string,
  attachDocument: any,
  accessToken: string,
  acquisition_date: string,
  acquisition_type: string
) => {

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
        attachDocument: attachDocument.attachment,
        newTitle: attachDocument.title,
        acquisition_date,
        acquisition_type
      }),
    });
    return res;
  } catch (err) {
    console.log("transfer", err);
  }
};




//registrar property verification
export const VerifyProperty = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/property/registrar/propertyVerification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};

//reject property

export const RejectProperty = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/property/registrar/propertyRejection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};


//profile

export const CreateOrUpdateProfile = async (idNumber: string, identification: string, ethereumAddress: string, newPhoneNumber: string, token: string, fullName: string, email: string, entity: string, postCode: string, postAddress: string) => {
  try {
    const res = await fetch("/api/accounts/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idNumber: idNumber,
        identification: identification,
        ethereumAddress: ethereumAddress,
        newPhoneNumber: newPhoneNumber,
        fullName: fullName,
        token: token,
        email: email,
        entity: entity,
        postCode: postCode,
        postAddress: postAddress
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};


//verify user profile

export const VerifyUserProfile = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/accounts/admin/verifyprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};

//verify user profile
export const RejectUserProfile = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/accounts/admin/rejectprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to verify", err);
  }
};

// delete user
export const DeleteUserProfile = async (id: string, jwtToken: string) => {
  try {
    const res = await fetch("/api/accounts/admin/deleteprofile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_id: id,
        token: jwtToken
      }),
    });

    return res;
  } catch (err) {
    console.log("failed to delete user", err);
  }
};







//   const submitOTP =async (data:any) => {
//     // handleOTP confirmation here
//     try {
//       const res = await fetch("/api/twilio/verify-otp",{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body: JSON.stringify({
//           phoneNumber:phoneNumber,
//           countryCode:"254",
//           otp:data.otp

//         }),
//       });
//       if (res.status ==200) {
//         setOpen(false)
//         if (pathName == "/login"){
//           try{
//             const res = await signIn("credentials", {
//               redirect: false,
//               phoneNumber: phoneNumber,
//               password: password,
//             });

//             if (res?.error) {
//               setShowNotification("Incorrect Credentials")
//               // showNotificationError("Incorrect Credentials");
//               console.log("can't sign in error");
//             } else if (res?.url) {
//               const updatedSession: any = await getSession();
//               setUser(updatedSession);
//               const userRole = updatedSession?.user?.userdata?.role
//               console.log("user role session",userRole)
//               console.log("user status session",status)
//               console.log("user access session",session?.user?.accesstokens)

//               // Redirect based on user's role
//               switch (userRole) {
//                 case "government":
//                   router.replace("/government");
//                   break;
//                 case "public":
//                   router.replace("/public");
//                   break;
//                 case "admin":
//                   router.replace("/admin");
//                   break;
//                 default:
//                   // Redirect to a default route or handle accordingly
//                   router.replace("/login");
//                   break;
//               }
//             } else {
//               // showNotificationError("Incorrect Credentials");
//               setOpen(false)
//               setShowNotification("Incorrect Credentials")
//               console.log("Incoreect Credentials")
//             }

//           }catch(err){
//             setOpen(false)
//             setShowNotification("Try Another time")
// console.log("userr session error",err)
//           }

//         }else{
//           try {
//             const res = await fetch("/api/accounts/signup", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 phoneNumber: phoneNumber,
//                 fullName: name,
//                 password: password,
//                 role: role,
//               }),
//             });
//             if (res.status === 200) {

//               setOpen(false);
//               router.push("/login")
//             }
//             if (res.status === 400) {
//               console.log("error for registering")
//               setOpen(false)
//               setShowNotification("phone already register")
//               //showNotificationError("phone already register");
//             }
//           }catch(error){
//             console.log("error register",error)
//             setShowNotification("Try Another time")

//           }
//         }

//       } else {
//         // Handle other cases if needed
//         console.log("OTP not approved",res);
//         setOpen(false)
//         setShowNotification("Failed OTP verification")
//       }
//    }catch(error){
//       console.log("error",error)
//    } // Replace with your API call

//     //setOpen(false);
//   }
