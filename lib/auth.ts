import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";

 export const NEXT_AUTH = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: ({ session, user }: any) => {
      session.user.id = user.id;
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    redirect: async ({  baseUrl }: any) => {
      // Redirect to the home page after sign-in
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
