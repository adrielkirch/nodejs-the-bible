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

  constructor(_id: string, title: string, text: string, created: Date, updated: Date, expirationDate: Date, remindDate: Date,status: Status) {
    this._id = _id;
    this.title = title;
    this.text = text;
    this.created = created;
    this.updated = updated;
    this.expirationDate = expirationDate;
    this.remindDate = remindDate;
    this.status = status;
  }
}
