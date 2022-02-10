import * as mongo from 'mongodb';

export interface MongoDbConfig {
  appUser: string;
  appPassword: string;
  hostName: string;
  dbName: string;
  dbCollectionName: string;
  mongoPort: string | number;
}

export class Mongo {
  public static client: mongo.MongoClient | null;

  public static buildMongoUrl(config: MongoDbConfig): string {
    return 'mongodb://'
      + `${ config.appUser }:${ encodeURIComponent(config.appPassword) }`
      + `@${ config.hostName }:${ config.mongoPort }`
      + `/${ config.dbName }`;
  }

  public static connect(url: string): Promise<any> {
    return new Promise<any>((res, rej) => {
      mongo.MongoClient.connect(url, (err : any, client: mongo.MongoClient | undefined) => {
        if (err) {
          Mongo.client = null;
          rej(err);
        }
        else {
          Mongo.client = client;
          res(client);
        }
      });
    })
  }

  public static disconnect(): void {
    if (Mongo.client) {
      Mongo.client.close();
    }
    Mongo.client = null;
  }
}