import { UserRepository } from "../../../lib/application/repositories/repository.user";
import { User } from "../../../lib/domain/entities/entity.user";
import { v4 as uuidv4 } from "uuid";

export class UserMockPersistence implements UserRepository {
  private db: User[] = [];

  async signup(email: string, password: string, name: string): Promise<User> {
    const newUser = new User(
      uuidv4(),
      email,
      password,
      name,
      new Date(),
      new Date()
    );
    this.db.push(newUser);
    return newUser;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = this.db.find(
      (user) => user.email === email && user.password === password
    );
    return user ? { ...user } : null;
  }

  async readByFieldAndValue(
    field: string,
    value: string
  ): Promise<User | null> {
    const user = this.db.find((user) => user[field] === value);
    return user ? { ...user } : null;
  }

  async readById(id: string): Promise<User | null> {
    const user = this.db.find((user) => user._id === id);
    return user ? { ...user } : null;
  }

  async update(id: string, name: string): Promise<void> {
    const userIndex = this.db.findIndex((user) => user._id === id);
    if (userIndex !== -1) {
      const updatedUser = { ...this.db[userIndex], name: name };
      this.db[userIndex] = updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    this.db = this.db.filter((user) => user._id !== id);
  }

  cleanAll(): void {
    this.db = [];
  }

  getDb(): User[] {
    return this.db;
  }
}
