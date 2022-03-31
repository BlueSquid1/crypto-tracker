#!/usr/bin/env node
import * as dotenv from 'dotenv';
// Load environment variables from repos .env file.
dotenv.config();

import * as http from 'http';
import * as mongoDatabase from './services/mongo-database';
import * as express from 'express';
import * as path from 'path';
import * as graphql from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import gqlTag from 'graphql-tag';

var schema = graphql.buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);


// This class implements the RandomDie GraphQL type
class RandomDie {
  numSides: number;
  
  constructor(numSides : number) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls} : any) : number[] {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// // The root provides the top-level API endpoints
// var root = {
//   getDie: ({numSides} : any) => {
//     return new RandomDie(numSides || 6);
//   }
// }


// export interface Animal {
//     animal:string;
//     name: string;
// }

const typeDefs = gql`

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.


  # This "Book" type defines the queryable fields for every book in our data source.

  type Book {

    title: String

    author: String

  }


  # The "Query" type is special: it lists all of the available queries that

  # clients can execute, along with the return type for each. In this

  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {

    books: [Book]

  }

`;

const books = [

  {

    title: 'The Awakening',

    author: 'Kate Chopin',

  },

  {

    title: 'City of Glass',

    author: 'Paul Auster',

  },

];

const resolvers = {

  Query: {

    books: () => books,

  },

};

const port = '443';
async function startApolloServer(typeDefs : any, resolvers : any) {
  const app = express.default();
  const clientDir = path.join(__dirname, '..', 'public');
  app.use(express.static(clientDir));

  app.set('port', port);


  /**
   * Create HTTP server.
   */

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  /**
   * Listen on provided port, on all network interfaces.
   */
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
  httpServer.on('close', onClose);
  await new Promise<void>(resolve => httpServer.listen({ port: port }, resolve));
  console.log(`Application is listening on port ${ port }`);
}

startApolloServer(typeDefs, resolvers);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error : any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() : Promise<void> {
  console.log('Listening on port ' + port);

  try {
    const url = mongoDatabase.MongoDatabase.buildMongoUrl({
      appUser: process.env['APP_USER']!,
      appPassword: process.env['APP_PWD']!,
      dbName: process.env['MONGO_INITDB_DATABASE']!,
      dbCollectionName: process.env['DB_COLLECTION_NAME']!,
      hostName: process.env['NODE_ENV'] !== 'production' ? 'localhost' : process.env['MONGO_HOSTNAME']!,
      mongoPort: process.env['MONGO_PORT']!
    });
    console.log("connecting to db with URL: " + url)
    await mongoDatabase.MongoDatabase.connect(url);
    console.log('Connected to database');
  } catch(err) {
    console.error('Unable to connect to database ::: ', err);
  }
}

function onClose() {
  console.log("Closing database connection");
  mongoDatabase.MongoDatabase.disconnect();
}