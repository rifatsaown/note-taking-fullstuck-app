import "dotenv/config";
import { Db, MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI ;

let dbConnection: Db = null; // connection to the database is stored here once it is established the first time

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
    if (dbConnection) return;
    try{
        await client.connect();
        dbConnection = client.db(process.env.DB_NAME);
        console.log("Connected successfully to Database");
    }
    catch(err){
        console.log(err);
    }
};

// get the connection to the database
export const getDbConnection = () => {
    return dbConnection;
};