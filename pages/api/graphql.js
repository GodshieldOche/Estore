import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../schema/type-defs'
import { resolvers } from '../../schema/resolvers'
import dbConnect from '../../utils/dbConnect'
import { getSession } from 'next-auth/react'
import { grapqlContext } from '../../middleware/auth'

dbConnect()


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: grapqlContext
});

const startServer = apolloServer.start();

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
};


export const config = { api: { bodyParser: false } };