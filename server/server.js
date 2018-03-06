import express from 'express';
require('dotenv').config();
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





// apolloFetch({
//   headers: {
//        Authorization: 'Bearer o9ck6UuRRb8PXbGR04zkzNrw6k5Fhbdb_ewvIX_GfT9k_Vj2XNijm7bcKt0noANPpcskxMKrkxDv38fmmRLEr4qSe66snRqVsioo0mzGqJXdZGBC1Zr5QJMfumOdWnYx',
//        'Content-Type': 'application/graphql',
//      },
//   query:  `{business(id: "garaje-san-francisco") {
//                 name
//                 id
//                 rating
//                 url
//             }}`,
// }).then(res=>{
//   console.log(res.data);
// })


const uri = 'https://api.yelp.com/v3/graphql';
const apolloFetch = createApolloFetch({uri});
const query =
        `{
          business(id: "garaje-san-francisco") {
              name
              id
              rating
              url
          }
        }`;


// apolloFetch.use(({ request, options }, next) => {
//   if (!options.headers) {
//     options.headers = {Authorization: `Bearer ${process.env.YAPI}`};
//   }
//   next();
// });
//
// apolloFetch({ query }) //all apolloFetch arguments are optional
//   .then(result => {
//     const { data, errors, extensions } = result;
//     console.log("then", result);
//     //GraphQL errors and extensions are optional
//   })
//   .catch(error => {
//     //respond to a network error
//   });





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
