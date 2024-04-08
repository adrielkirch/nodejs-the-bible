import { Service } from "typedi";
import { Comment } from "../../../../domain/entities/entity.comment";
import { CommentRepository } from "../../../repositories/repository.comment";
import SecurityUtil from "../../../../utils/util.security";
import { CommentUser } from "../../../../domain/entities/entity.commentUser";

export interface ReadByIdUseCase {
  execute(id: string): Promise<CommentUser | null>;
}

@Service()
export class ReadByIdUseCaseImpl implements ReadByIdUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: string): Promise<CommentUser | null> {
    const comment = await this.commentRepository.read(id);
    if (!comment) {
      throw new Error(`Comment ${id} not found`);
    }
    const commentSafe = SecurityUtil.removeSubfieldSensitiveProperty(
      { ...comment },
      "user",
      "password"
    );
    return commentSafe;

  }
}
