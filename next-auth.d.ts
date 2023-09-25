import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string | null;
    surname: string | null;
    username: string | null;
    role: string | null;
  }
  interface Session {
    user: User & {
      name: string;
      surname: string;
      username: string;
      role: string;
    };
    token: {
      name: string;
      surname: string;
      username: string;
      role: string;
    };
  }
}
