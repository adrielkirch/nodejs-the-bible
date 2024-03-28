import { User } from "../../../domain/entities/entities.user";
import { UserRepository } from "../../../application/repositories/repository.user";
import mongodb, { Mongodb } from "../../databases/database.mongo";
import { Service } from "typedi";

@Service()
export class UserPersistence implements UserRepository {
    private collectionName: string = "users"; 
    private db: Mongodb = mongodb;

    async create(email: string, password: string, name: string): Promise<User> {
        const db = await this.db.getInstance(); 

        const newUser = {
            email,
            password,
            name,
        };

        const collection = db.collection(this.collectionName);
        const result = await collection.insertOne(newUser);
        const insertedUserId = result.insertedId;

        if (!insertedUserId) {
            throw new Error("Failed to insert user");
        }

        const user: User = {
            _id: insertedUserId.toString(),
            email,
            password,
            name,
        };

        return user;
    }
}
