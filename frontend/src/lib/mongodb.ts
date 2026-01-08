import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGO_URI as string;
const options: MongoClientOptions = {};

// Validate required env var
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Extend global type to allow `_mongoClientPromise`
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse the connection during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
