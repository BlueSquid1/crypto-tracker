import * as express from 'express';
import * as path from 'path';
import { Express, Request, Response } from 'express';

import { Mongo } from './data/mongo';

export interface Animal {
    animal:string;
    name: string;
  }

export default function createApp(): Express {
    const app = express();
    const clientDir = path.join(__dirname, '../public');  
    app.use(express.static(clientDir));                   
    app.get('/api/:name', async (req: Request, res: Response) => {
        try {
            if(Mongo.client)
            {
                const animal : Animal = { animal: 'fish', name: 'Phillip' };
                const collection = Mongo.client.db('mydatabase').collection('animals');
                await collection.insertOne(animal);
                res.send(animal);
            }
            res.send("failed");
        } catch (err)
        {
            
        }
    });
    return app;
}
