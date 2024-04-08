
export class Comment {
  public  _id: string;
  public  title: string;
  public  text: string;
  public  created: Date;
  public  updated: Date;
  public  userId: string;
  public  taskId: string;

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
