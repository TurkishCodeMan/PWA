import { db } from "@/shared/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { comparePasswords } from "@/shared/utils/hash-pass";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        const isUser = await comparePasswords(
          credentials?.password as string,
          user?.password as string
        );

        if (isUser && user) {
          return user;
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ];

  return NextAuth(req, res, {
    providers,
    adapter: PrismaAdapter(db),
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
      signIn: "/signin",
      error: "/signin",
    },

    callbacks: {
      async session({ session, user }) {
        // if (user) {
        //   session.user?.email;
        // }
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (token && user) {
          return {
            token: token,
            ...user,
            id: `${user.id}`,
            accessTokenExpires:
              Date.now() + (account?.expires_in as any) * 1000,
            refreshToken: account?.refresh_token,
          };
        }

        return token;
      },
    },
  });
}
