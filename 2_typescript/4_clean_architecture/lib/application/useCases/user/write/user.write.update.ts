import { Service } from 'typedi';
import { UserRepository } from '../../../repositories/repository.user';


export interface UpdateUseCase {
    execute(id: string, name: string): Promise<void>;
}

@Service()
export class UpdateUseCaseImpl implements UpdateUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string, name: string): Promise<void> {
        const exists = await this.userRepository.readById(id);

        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.userRepository.update(id, name)
    }
}
