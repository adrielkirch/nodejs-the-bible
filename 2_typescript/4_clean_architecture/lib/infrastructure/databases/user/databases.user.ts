import { User } from "../../../domain/entities/entities.user";
import { UserRepository } from "../../../application/repositories/repository.user";
import { Service } from "typedi";
import {  Model } from 'mongoose';
import { UserDocument, UserModel } from "../../../domain/schemas/schema.user";

@Service()
export class UserPersistence implements UserRepository {
    private userModel: Model<UserDocument>;

    constructor() {
        this.userModel = UserModel;
    }

    private mapToUser(result: any): User | null {
        if (!result) {
            return null;
        }

        return {
            _id: result._id.toString(),
            email: result.email,
            password: result.password,
            name: result.name,
        };
    }

    async signup(email: string, password: string, name: string): Promise<User> {
        const newUser = await this.userModel.create({ email, password, name });
        return newUser.toObject();
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email, password }).exec();
        return this.mapToUser(user);
    }

    async readByFieldAndValue(field: string, value: string): Promise<User | null> {
        const user = await this.userModel.findOne({ [field]: value }).exec();
        return this.mapToUser(user);
    }

    async readById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id);
        return user ? this.mapToUser(user) : null;
    }

    async update(id: string, name: string): Promise<void> {
        await this.userModel.findByIdAndUpdate(id, {
            name
        });
    }

    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }
}
