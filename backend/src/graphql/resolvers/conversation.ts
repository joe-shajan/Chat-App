const resolvers = {
  //* ---------Queries---------
  Query: {},
  //* ---------Mutations---------
  Mutation: {
    createConversation: async () => {
      console.log("inside create conversation");
    },
  },
};

export default resolvers;
