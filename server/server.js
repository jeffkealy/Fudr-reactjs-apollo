import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import {createApolloFetch} from 'apollo-fetch'

import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import mongoose from './dbConfig/mongoose';
import Dish from './models/dish'
import Restaurant from './models/restaurant'

import { schema } from './source/schema';

const myGraphQLSchema = schema;
const PORT = 4000;
const server = express();
const db = mongoose();


server.use('*', cors({ origin: 'http://localhost:3000'}));

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema, context: {Dish, Restaurant}}));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));


const ws = createServer(server);

ws.listen(PORT, () =>{
  console.log(`Your GraphQL server is running on port ${PORT}`)

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  })
});
