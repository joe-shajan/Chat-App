import userResolvers from "./user";
import conversationResolver from "./conversation";
import messagesResolver from "./messages";
import merge from "lodash.merge"; // to merge all the resolvers into a single object

const resolvers = merge(
  {},
  userResolvers,
  conversationResolver,
  messagesResolver
);

export default resolvers;
