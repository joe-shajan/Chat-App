import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  //pubsub
}

/**
 * users
 */
export interface Session {
  user?: User;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
