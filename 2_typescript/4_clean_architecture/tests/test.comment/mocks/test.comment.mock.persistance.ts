import { Task } from "../../../lib/domain/entities/entity.task";
import { v4 as uuidv4 } from "uuid";
import { CommentRepository } from "../../../lib/application/repositories/repository.comment";
import { UserMock } from "../../test.shared/mocks/test.shared.mock.user";
import { TaskMock } from "../../test.shared/mocks/test.shared.mock.task";
import { Comment } from "../../../lib/domain/entities/entity.comment";
import { CommentUser } from "../../../lib/domain/entities/entity.commentUser";
import { User } from "../../../lib/domain/entities/entity.user";

export class CommentMockPersistence implements CommentRepository {
  private tasks: Task[] = [
    {
      _id: TaskMock.getId(),
      title: "Lorem ipsum dolor tortor",
      text: "Lorem ipsum ...",
      created: new Date(), // Corrected
      updated: new Date(), // Corrected
      expirationDate: new Date(), // Corrected
      remindDate: new Date(), // Corrected
      status: "TODO",
      userId: UserMock.getId(),
      assignTo: UserMock.getId(),
    },
  ];
  private comments: CommentUser[] = [];

  async add(
    title: string,
    text: string,
    userId: string,
    taskId: string
  ): Promise<CommentUser> {
    const newComment: CommentUser = new CommentUser(
      new Comment(
        uuidv4(),
        title,
        text,
        new Date(),
        new Date(),
        userId,
        taskId
      ),
      new User(userId, "", "", "", new Date(), new Date())
    );
    this.comments.push(newComment);
    return newComment;
  }
  async update(id: string, title: string, text: string): Promise<void> {
    const commentIndex = this.comments.findIndex(
      (comment) => comment._id === id
    );
    if (commentIndex !== -1) {
      this.comments[commentIndex] = {
        ...this.comments[commentIndex],
        title: title,
        text: text,
      };
    }
  }

  async read(id: string): Promise<CommentUser | null> {
    let comment = this.comments.find((comment) => comment._id === id);
    if (!comment) {
      return null;
    }
    comment["user"] = new User(
      UserMock.getId(),
      "",
      "",
      "",
      new Date(),
      new Date()
    );
    return comment;
  }

  async readBytask(taskId: string): Promise<Comment[] | null> {
    const comments = this.comments.filter(
      (comment) => comment.taskId === taskId
    );
    return comments.length ? comments : null;
  }

  async delete(id: string): Promise<void> {
    this.comments = this.comments.filter((comment) => comment._id !== id);
  }
}
