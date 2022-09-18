import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server'

import { merge } from 'lodash'
import user from './api/user'
import dbConnection from './db/config'

// Todo
// Move config to a different filed called server and initialise apollo server there
const config = {
    typeDefs: [user.typeDefs].join(' '),
    resolvers: merge({}, user.resolvers),
    csrfPrevention: false,
    context: ({ req }: any) => {
        const token = req.headers.authorization || ''
        return { ...req, dbConnection }
    },
}

dotenv.config()

const server = new ApolloServer(config)

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
