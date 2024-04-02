import { Status } from "../types/taskStatus";

export class Task {
  public readonly _id: string;
  public readonly title: string;
  public readonly text: string;
  public readonly created: Date;
  public readonly updated: Date;
  public readonly expirationDate: Date;
  public readonly remindDate: Date;
  public readonly status: Status;
  public readonly assignTo: string;
  public readonly userId: string;

  constructor(_id: string, title: string, text: string, created: Date, updated: Date, expirationDate: Date, remindDate: Date,status: Status,assignTo: string,userId:string) {
    this._id = _id;
    this.title = title;
    this.text = text;
    this.created = created;
    this.updated = updated;
    this.expirationDate = expirationDate;
    this.remindDate = remindDate;
    this.status = status;
    this.userId = userId;
    this.assignTo = assignTo;
  }
}
