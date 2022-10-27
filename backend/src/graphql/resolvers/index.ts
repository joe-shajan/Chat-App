import userResolvers from "./user";
import merge from "lodash.merge"; // to merge all the resolvers into a single object

const resolvers = merge({}, userResolvers);

export default resolvers;
