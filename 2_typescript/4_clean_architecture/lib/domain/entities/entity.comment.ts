
export class Comment {
  public readonly _id: string;
  public readonly title: string;
  public readonly text: string;
  public readonly created: Date;
  public readonly updated: Date;
  public readonly userId: string;
  public readonly taskId: string;

  constructor(_id: string, title: string, text: string, created: Date, updated: Date, userId: string, taskId: string) {
    this._id = _id;
    this.title = title;
    this.text = text;
    this.created = created;
    this.updated = updated;
    this.userId = userId;
    this.taskId = taskId;
  }
}
