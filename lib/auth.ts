import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "./prismadb";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET_ID ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET_ID ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await prismadb.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser || !existingUser.password) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatch) {
          return null;
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt", token, user);
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};
