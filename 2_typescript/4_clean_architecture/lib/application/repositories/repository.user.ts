
import { User } from "../../domain/entities/entity.user";

export interface UserRepository {
    signup(email: string, password: string, name: string): Promise<User>;
    login(email: string, password: string): Promise<User | null>;
    readByFieldAndValue(field: string, value: any): Promise<User | null>;
    readById(id:string): Promise<User | null>;
    update(id:string,name:string): Promise<void>;
    delete(id:string): Promise<void>;
}