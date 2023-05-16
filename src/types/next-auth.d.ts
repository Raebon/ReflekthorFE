/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type accessToken = string;

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: accessToken;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      accessToken: accessToken;
    };
  }
}
