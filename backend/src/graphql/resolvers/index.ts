import userResolvers from "./user";
import conversationResolver from "./conversation";
import messagesResolver from "./messages";
import scalarResolver from "./scalars";
import merge from "lodash.merge"; // to merge all the resolvers into a single object

const resolvers = merge(
  {},
  userResolvers,
  conversationResolver,
  messagesResolver,
  scalarResolver
);

export default resolvers;
