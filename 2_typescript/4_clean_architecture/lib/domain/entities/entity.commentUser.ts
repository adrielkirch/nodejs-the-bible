import { Comment } from "./entity.comment";
import { User } from "./entity.user";

export class CommentUser extends Comment {
  public  user: User;

  constructor(comment: Comment, user: User) {
    super(comment._id, comment.title, comment.text, comment.created, comment.updated, comment.userId, comment.taskId);
    this.user = user;
  }
}
