import NextAuth from "next-auth";
import { JwtPayload } from "next-auth/jwt";
declare module "next-auth"{
    interface Session{
        user: {
          userdata:{
            _id: string;
            password: string;
            role: string;
            entity:string;
            phoneNumber: string;
            fullName: string;
            createdAt: string;
            updatedAt: string;
            status: string;
            __v: number;
          }      
          accesstokens:{
            accestoken: string;

          },
          iat: number;
          exp: number;
          jti: string;

          },
         
            
          
        }
    }


    // Define the interface for the token obtained from getToken
export interface TokenPayload extends JwtPayload {
  
    userdata:{
      _id: string;
      password: string;
      role: string;
      entity:string;
      phoneNumber: string;
      fullName: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      __v: number;
    }      
    
      accesstokens: string;

    
    iat: number;
    exp: number;
    jti: string;

    
   
      
    
  
}