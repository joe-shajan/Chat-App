import { ConversationPopulated, GraphQLContext } from "../../util/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";

const resolvers = {
  //* ---------Queries---------
  Query: {
    conversations: async (
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<Array<ConversationPopulated>> => {
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError("not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversations = await prisma.conversation.findMany({
          // where: {
          //   participants: {
          //     some: {
          //       userId: {
          //         equals: userId,
          //       },
          //     },
          //   },
          // },
          include: conversationPopulated,
        });

        return conversations.filter(
          (conversation: any) =>
            !!conversation.participants.find((p: any) => p.userId === userId)
        );
      } catch (error: any) {
        console.log("conversations error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  //* ---------Mutations---------
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: [string] },
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { session, prisma, pubsub } = context;
      const { participantIds } = args;

      if (!session?.user) {
        throw new GraphQLError("not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        //emit a CONVERSATION_CREATED   event using pubsub
        pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: conversation,
        });

        return {
          conversationId: conversation.id,
        };
      } catch (error) {
        console.log("create conversation error", error);
        throw new GraphQLError("Error creating conversation");
      }
    },
  },
  //* ---------Subscriptions---------
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
        },
        (
          payload: ConversationCreatedSubscriptionPayload,
          _,
          context: GraphQLContext
        ) => {
          const { session } = context;
          const {
            conversationCreated: { participants },
          } = payload;

          const userIsParticipant = !!participants.find(
            (p) => p.userId === session?.user?.id
          );

          return userIsParticipant;
        }
      ),
    },
  },
};

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: ConversationPopulated;
}

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
