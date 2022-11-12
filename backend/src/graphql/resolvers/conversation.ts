import { GraphQLContext } from "../../util/types";

const resolvers = {
  //* ---------Queries---------
  Query: {},
  //* ---------Mutations---------
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: [string] },
      context: GraphQLContext
    ) => {
      const { participantIds } = args;
      console.log(participantIds);

      console.log("inside create conversation");
    },
  },
};

export default resolvers;
