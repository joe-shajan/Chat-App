import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  //* ---------Queries---------
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;

      if (!session?.user) throw new GraphQLError("Not authorized");

      const {
        user: { username: myUsername },
      } = session;
      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error: any) {
        console.log("search users error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  //* ---------Mutations---------
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return { error: "not authorized" };
      }

      const { id: userId } = session.user;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          return { error: "username already exists" };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("create username error", error);
        return { error: error?.message };
      }
    },
  },
  //* ---------Subscriptions---------
};

export default resolvers;
