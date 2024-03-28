import { Service } from 'typedi';
import { User } from '../../../../domain/entities/entities.user';
import { UserRepository } from '../../../repositories/repository.user';
import SecurityUtil from '../../../../utils/util.security';

export interface ReadByIdUseCase {
    execute(id:string): Promise<User | null>;
}

@Service() 
export class ReadByIdUseCaseImpl implements ReadByIdUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id:string): Promise<User | null> {
        let user = await this.userRepository.readById(id);
        if(!user) {
            throw new Error(`Email or password incorrect(s)`);
        }
        user = SecurityUtil.removeSensitiveProperty(user, "password");
        return user;
    }
}
