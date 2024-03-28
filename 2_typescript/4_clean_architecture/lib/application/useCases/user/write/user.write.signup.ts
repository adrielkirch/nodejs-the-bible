import { Service } from 'typedi';
import { User } from '../../../../domain/entities/entities.user';
import { UserRepository } from '../../../repositories/repository.user';
import SecurityUtil from '../../../../utils/util.security';

export interface SignupUseCase {
    execute(email: string, password: string, name: string): Promise<User>;
}

@Service() 
export class SignupUseCaseImpl implements SignupUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute(email: string, password: string, name: string): Promise<User> {

        const exists = await this.userRepository.readByFieldAndValue('email',email);

        if(exists) {
            throw new Error(`${email} is Unavailable`);
        }
        const hashPassword = SecurityUtil.generateHashWithSalt(password);
        let newUser = await this.userRepository.signup(email, hashPassword, name);
        newUser = SecurityUtil.removeSensitiveProperty(newUser, "password");
        return newUser;
    }
}
