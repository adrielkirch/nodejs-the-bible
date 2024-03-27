
import { User } from "../../../../domain/entities/entities.user";
import { UserRepository } from "../../../repositories/repository.user"; 

export interface SignupUseCase {
    execute(email: string, password: string, name: string): Promise<User>;
}

export class SignupUseCaseImpl implements SignupUseCase {
    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string, name: string): Promise<User> {
        const newUser = await this.userRepository.create(email, password, name);
        return newUser;
    }
}