import mongooese, {Mongoose} from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection{
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongooese

if(!cached){
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase =async () =>{
    {/*Whenever trying to connect to database, will check if connection exists,
if not, check if url exist and throw erro, if it exist then get a connection*/}
    if (cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing mongodburl');

    cached.promise = cached.promise || mongooese.connect(MONGODB_URL, {
        dbName: 'ai imagegen', bufferCommands: false
    })
    
    cached.conn = await cached.promise;

    return cached.conn
}