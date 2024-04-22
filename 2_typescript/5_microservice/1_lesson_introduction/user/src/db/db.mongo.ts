import mongoose, { Connection } from "mongoose";
import {NODE_ENV,MONGO_URI} from "../config"

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
    this.dbName = NODE_ENV;
    this.connect();
  }

  async connect(): Promise<Connection> {
    if (this.db) {
      return this.db;
    }

    const url = MONGO_URI;

    const options: CustomConnectOptions = {
      bufferCommands: false,
      dbName: this.dbName,
    };

    const connection = await mongoose.connect(url, options);

    this.db = mongoose.connection;
    return this.db;
  }

  async getInstance(): Promise<Connection> {
    if (!this.db) {
      await this.connect();
    }

    if (!this.db) {
      throw new Error("MongoDB connection not initialized");
    }

    return this.db;
  }
}

export default new Mongodb();
