#!/usr/bin/env node

import * as dotenv from 'dotenv';
// Load environment variables from repos .env file.
dotenv.config();

import * as http from 'http';
import * as mongoDatabase from './services/mongo-database';
import * as express from 'express';
import * as path from 'path';

export interface Animal {
    animal:string;
    name: string;
  }

const app = express();
const clientDir = path.join(__dirname, './public');  
app.use(express.static(clientDir));                   
app.get('/api/:name', async (req: express.Request, res: express.Response) => {
    try {
        if(mongoDatabase.MongoDatabase.client)
        {
            const animal : Animal = { animal: 'fish', name: 'Phillip' };
            const collection = mongoDatabase.MongoDatabase.client.db('mydatabase').collection('animals_table');
            await collection.insertOne(animal);
            res.send(animal);
        }
        res.send("failed");
    } catch (err)
    {
        
    }
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env['PORT'] || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () : void => console.log(`Application is listening on port ${ port }`));
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val : string) : string | number | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
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
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);

  try {
    const url = mongoDatabase.MongoDatabase.buildMongoUrl({
      appUser: process.env['APP_USER'],
      appPassword: process.env['APP_PWD'],
      dbName: process.env['MONGO_INITDB_DATABASE'],
      dbCollectionName: process.env['DB_COLLECTION_NAME'],
      hostName: process.env['NODE_ENV'] !== 'production' ? 'localhost' : process.env['MONGO_HOSTNAME'],
      mongoPort: process.env['MONGO_PORT']
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