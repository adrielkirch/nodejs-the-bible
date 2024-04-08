import { Service } from "typedi";
import { User } from "../../../../domain/entities/entity.user";
import { UserRepository } from "../../../repositories/repository.user";
import SecurityUtil from "../../../../utils/util.security";

export interface ReadByIdUseCase {
  execute(id: string): Promise<User | null>;
}

@Service()
export class ReadByIdUseCaseImpl implements ReadByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    let user = await this.userRepository.readById(id);
    if (!user) {
      throw new Error(`User ${id} does not exists`);
    }

    return user;
  }
}
