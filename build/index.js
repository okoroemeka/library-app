"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("@graphql-tools/schema");
const prisma = new client_1.PrismaClient();
const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
  }
`;
const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.user.findMany();
        }
    }
};
exports.schema = (0, schema_1.makeExecutableSchema)({
    resolvers,
    typeDefs,
});
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: exports.schema,
}));
app.listen(4000);
