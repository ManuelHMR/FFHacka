import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let connectionMongo;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try{
    await mongoClient.connect();
    connectionMongo = mongoClient.db('ffhacka');
} catch (err) {
    console.log("Erro ao conectar no MongoDB");
}

export default connectionMongo;