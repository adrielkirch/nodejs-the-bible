import { Service } from "typedi";
import { TaskRepository } from "../../../repositories/repository.task";
import { TaskUser } from "../../../../domain/entities/entity.taskUser";
import SecurityUtil from "../../../../utils/util.security";

export interface ReadByIdUseCase {
  execute(id: string): Promise<TaskUser | null>;
}

@Service()
export class ReadByIdUseCaseImpl implements ReadByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<TaskUser | null> {
    const task = await this.taskRepository.read(id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    const taskSafe = SecurityUtil.removeSubfieldSensitiveProperty(
      { ...task },
      "user",
      "password"
    );
    return taskSafe;
  }
}
