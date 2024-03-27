import UserRepository from "../repositories/repository.user";
import SecurityUtil from "../utils/util.security";


export default class UserService {

  public repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
  async signup(email: string, name: string, password: string): Promise<any> {
    const exists = await this.repository.getByFieldValue("email", email);
    if (exists) {
      throw new Error("E-mail not available");
    }
    const hashPassword = SecurityUtil.generateHashWithSalt(password);
    const user = await this.repository.signup(email, name, hashPassword);
    return user.toObject();
  }

  async login(email: string, password: string): Promise<any> {
    const hashPassword = SecurityUtil.generateHashWithSalt(password);
    let user = await this.repository.login(email, hashPassword);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    user = user.toObject();
    const token = SecurityUtil.generateJwt(user._id.toString());
    user = SecurityUtil.removeSensitiveProperty(user, "password");
    return {
      _id: user._id,
      token: token
    };
  }

  async getById(id: string): Promise<any> {
    let user = await this.repository.getById(id);
    if (!user) {
      throw new Error("Invalid Id");
    }
    user = user.toObject();
    user = SecurityUtil.removeSensitiveProperty(user, "password");
    return user;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await this.repository.getById(id);
    if (!exists) {
      throw new Error("Invalid Id");
    }
    await this.repository.deleteById(id);
  }

  async update(newUser: any): Promise<void> {
    const exists = await this.repository.getById(newUser._id);
    if (!exists) {
      throw new Error("Invalid Id");
    }
    await this.repository.update(newUser);
  }
}

