import { User } from "../../domain/entities/entities.user";

export interface UserRepository {
    create(email: string, password: string, name: string): Promise<User>;
}