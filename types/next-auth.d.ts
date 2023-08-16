import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Profile } from "next-auth";
declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
  }

  interface User {
    id: string;
    username: string;
  }

  interface Profile {
    id: string,
    picture: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}