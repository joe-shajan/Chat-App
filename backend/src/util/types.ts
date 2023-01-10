import { Prisma, PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";
import {
  conversationPopulated,
  participantPopulated,
} from "../graphql/resolvers/conversation";

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

// conversations
export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;
