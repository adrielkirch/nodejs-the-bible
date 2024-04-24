import mongoose, { Connection } from "mongoose";
import {MONGO_URI} from "../config";

interface CustomConnectOptions extends mongoose.ConnectOptions {
  bufferCommands?: boolean;
  dbName?: string;
  user?: string;
  pass?: string;
  autoIndex?: boolean;
  autoCreate?: boolean;
}

class Mongodb {
  private db: Connection | undefined;
  private dbName: string | undefined;
  constructor() {
    this.db = undefined;
    this.dbName = process.env.NODE_ENV;
    this.connect();
  }

  async connect(): Promise<Connection> {
    if (this.db) {
      return this.db;
    }



    const options: CustomConnectOptions = {
      bufferCommands: false,
      dbName: this.dbName,
    };

    const connection = await mongoose.connect(MONGO_URI, options);

    this.db = mongoose.connection;
    return this.db;
  }

  async getInstance(): Promise<Connection> {
    if (!this.db) {
      await this.connect();
      console.error("Connected to MongoDB successfully !");
    }

    if (!this.db) {
      throw new Error("MongoDB connection not initialized");
    }

    return this.db;
  }
}

export default new Mongodb();
