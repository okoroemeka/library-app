
import resolvers from "./user.resolver";
import gqlLoader from "../../utils/gqlLoader";

export default {resolvers, typeDefs: gqlLoader('user/user.graphql')}