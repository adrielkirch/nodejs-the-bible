import { Comment } from "../../../domain/entities/entity.comment";
import { CommentRepository } from "../../../application/repositories/repository.comment";
import { Service } from "typedi";
import { Model } from "mongoose";
import {
  CommentDocument,
  CommentModel,
} from "../../../domain/schemas/schema.comment";
import { ObjectId } from "mongodb";
import { CommentUser } from "../../../domain/entities/entity.commentUser";

@Service()
export class CommentPersistence implements CommentRepository {
  private commentModel: Model<CommentDocument>;

  constructor() {
    this.commentModel = CommentModel;
  }


  private mapToCommentUser(result: any): CommentUser | null {
    if (!result) {
      return null;
    }

    return {
      _id: result._id.toString(),
      title: result.title,
      text: result.text,
      created: result.created,
      updated: result.updated,
      userId: result.userId.toString(),
      taskId: result.userId.toString(),
      user: {
        _id: result.user._id.toString(),
        email: result.user.email,
        password: result.user.password,
        name: result.user.name,
        created: result.user.created,
        updated: result.user.updated,
      },
    };
  }

  async add(
    title: string,
    text: string,
    userId: string,
    taskId: string
  ): Promise<Comment> {
    const newTask = await this.commentModel.create({
      title,
      text,
      created: Date.now(),
      updated: Date.now(),
      userId: new ObjectId(userId),
      taskId: new ObjectId(taskId),
    });
    return newTask.toObject();
  }

  async read(id: string): Promise<CommentUser | null> {
    const comment = await this.commentModel.findById(id).exec();
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ];
    const result = await this.commentModel.aggregate(pipeline);
    return this.mapToCommentUser(result[0]);
  }

  async readBytask(taskId: string): Promise<Comment[] | null> {
    const comments = await this.commentModel.find({ taskId: taskId });

    if (!comments || comments.length === 0) {
      return null;
    }

    return comments.map((comment) => comment.toObject());
  }

  async update(id: string, title: string, text: string): Promise<void> {
    await this.commentModel.findByIdAndUpdate(id, {
      title,
      text,
      updated: Date.now(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id);
  }
}
