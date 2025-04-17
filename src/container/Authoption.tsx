import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

//import connect from "@/utils/db";
import type { NextAuthOptions } from "next-auth";
//import type { NextAuthConfig } from "next-auth"
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "phoneNumber", type: "number" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        //await connect();
        try {
          const res = await fetch(`${AtlasBackendApi}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: credentials.phoneNumber,
              password: credentials.password,
            }),
          });
          const user = await res.json();

          if (user) {
            return user;
          } else {
            return user.message;
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // ...add more providers here
  ],
  callbacks: {

    async jwt({ token, user }: any) {
      //console.log("jwt new callback",{token,user})
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      session.user = token as any;
      console.log("session new  callback", { token });

      return session;
    },
    //for other providers
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
