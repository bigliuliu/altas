// import NextAuth from "next-auth";
// import { Account, User as AuthUser } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import connect from "@/utils/db";

// export const authOptions: any = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         phoneNumber: { label: "phoneNumber", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         await connect();
//         try {
//           const user = await User.findOne({ phoneNumber: credentials.phoneNumber });
//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               return user;
//             }
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//     // Google({
//     //   clientId: process.env.GOOGLE_CLIENT_ID as string,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     // }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async jwt({token,user,session}:any){
//       console.log("jwt callback",{session,token,user})
//       if(user){
//         return {...token,
//         phoneNumber: user.phoneNumber,
//       role:user.role}
//       }
//       return token
//     },

//     async  session({session,token,user}:any){
//       console.log("session callback",{session,token,user})
//       return {
//         ...session,
//         user:{
//           ...session.user,
//           id : token.id,
//           role: token.role,
//           phoneNumber: token.phoneNumber
//         }
//       }
//       return session

//     },

//     //for other providers
//     async signIn({ user, account }: { user: AuthUser; account: Account }) {
//       if (account?.provider == "credentials") {
//         return true;
//       }
//       if (account?.provider == "google") {
//         await connect();
//         try {
//           const existingUser = await User.findOne({ email: user.email });
//           if (!existingUser) {
//             const newUser = new User({
//               email: user.email,
//             });

//             await newUser.save();
//             return true;
//           }
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
    
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session:{
//     strategy: "jwt"

//   }
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import { authOptions } from "@/container/Authoption";
import NextAuth from "next-auth";

 const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };