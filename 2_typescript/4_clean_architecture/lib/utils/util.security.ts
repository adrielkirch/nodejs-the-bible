import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET_KEY } from "../config";
import { v4 as uuidv4 } from "uuid";

export default class SecurityUtil {
  static generateUUID(): string {
    return uuidv4();
  }

  static generateJwt(userId: string): string {
    const payload = { user: userId };
    const token = jwt.sign(payload, JWT_SECRET_KEY!);
    return token;
  }

  static decodedJwt(token: string): string {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY!);
    return decoded.user;
  }

  static generateHashWithSalt(data: string): string {
    return crypto
      .createHash("sha512")
      .update(data + process.env.SALT)
      .digest("hex");
  }

  static generateHashDigitalSignature(data: string): string {
  
    return crypto
      .createHash("sha512")
      .update(data + new Date() + this.genRandomBytes(64))
      .digest("hex");
  }

  static genRandomBytes(len: number): string {
    const buf = crypto.randomBytes(len);
    return buf.toString("hex");
  }

  static removeSensitiveProperty<T extends Record<string, any>>(
    data: T,
    field: keyof T
  ): T {
    Reflect.deleteProperty(data, field);
    return data;
  }
}
