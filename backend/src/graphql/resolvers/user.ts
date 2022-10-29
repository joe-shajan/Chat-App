const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: () => {
      console.log("in create username");
    },
  },
};

export default resolvers;
