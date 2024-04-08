import { Service } from 'typedi';
import { User } from '../../../../domain/entities/entity.user';
import { UserRepository } from '../../../repositories/repository.user';
import SecurityUtil from '../../../../utils/util.security';
import ResponseLoginDTO from '../../../../domain/dto/response/dto.response.login';

export interface LoginUseCase {
    execute(email: string, password: string): Promise<ResponseLoginDTO>;
}

@Service()
export class LoginUseCaseImpl implements LoginUseCase {
    constructor(private userRepository: UserRepository) {
        
    }

    async execute(email: string, password: string): Promise<ResponseLoginDTO> {
        const hashPassword = SecurityUtil.generateHashWithSalt(password);
        const user = await this.userRepository.login(email, hashPassword);

        if (!user) {
            throw new Error(`Email or password incorrect(s)`);
        }

        const token = SecurityUtil.generateJwt(user._id);
        return {
            token: token,
            _id: user._id
        };
    }
}
