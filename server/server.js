require('dotenv').config();
import express from 'express';
import path from 'path';
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
const PORT = process.env.PORT || 4000;
const server = express();
const db = mongoose();

console.log('PORT', PORT);
console.log('process.env.PORT', process.env.PORT);
console.log('process.env.NODE_ENV', process.env.NODE_ENV );
console.log("process.env.GRAPHQL_URI", process.env.GRAPHQL_URI)


if(process.env.NODE_ENV !== 'production'){
  server.use('*', cors({ origin: 'http://localhost:3000'}));
}

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
server.use(staticFiles);

console.log("PATH", path.join(__dirname, '../../client/build'));
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema, context: {Dish, Restaurant}}));
server.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

server.use( '/*', staticFiles);

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
