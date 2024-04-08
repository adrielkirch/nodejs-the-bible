export class User {
  public readonly _id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly name: string;
  public readonly created: Date;
  public readonly updated: Date;

  constructor(
    _id: string = "",
    email: string,
    password: string,
    name: string,
    created: Date,
    updated: Date
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this._id = _id;
    this.created = created;
    this.updated = updated;
  }
}
