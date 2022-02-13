/*
    This script is automatically when docker creates the database volume for the first time. Must be javascript unfortunately.
*/
var dbName = _getEnv('MONGO_INITDB_DATABASE');
var app_user = _getEnv('APP_USER');
var app_pwd = _getEnv('APP_PWD');

db = db.getSiblingDB(dbName);

db.createUser(
    {
        user: app_user,
        pwd: app_pwd,
        roles: [
            {
                role: "readWrite",
                db: dbName
            }
        ]
    }
);

db.createCollection("animals_table");