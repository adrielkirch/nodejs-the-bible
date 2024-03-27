export class User {
    public readonly _id: string;
    public readonly email: string;
    public readonly password: string;
    public readonly name: string;
  
    constructor(email: string, password: string, name: string, _id: string = "") {
      this.email = email;
      this.password = password;
      this.name = name;
      this._id = _id;
    }
  }
  