
import { MongoClient } from 'mongodb'

let dbo;

export async function connectDB(){
    try{
        const client = new MongoClient(process.env.MONGO_DB_CONNECTION);

        await client.connect();
    }
    catch(error){
        console.error(error);
    }
}