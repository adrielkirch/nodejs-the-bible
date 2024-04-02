import { Service } from 'typedi';
import { UserRepository } from '../../../repositories/repository.user';


export interface DeleteUseCase {
    execute(id: string): Promise<void>;
}

@Service()
export class DeleteUseCaseImpl implements DeleteUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string): Promise<void> {
        const exists = await this.userRepository.readById(id);

        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.userRepository.delete(id)
    }
}
