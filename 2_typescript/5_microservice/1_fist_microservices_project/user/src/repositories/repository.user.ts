import User, { IUserModel } from "../models/model.user";

export default class UserRepository {
     async signup(email: string, name: string, password: string): Promise<any> {
        const newUser = new User({ email, name, password });
        await newUser.save();
        return newUser;
    }

     async login(email: string, password: string): Promise<IUserModel | null> {
        const user = await User.findOne({ email, password });
        return user;
    }

     async getById(id: string): Promise<IUserModel | null> {
        const user = await User.findById(id);
        return user;
    }

     async getByFieldValue(field: string, value: any): Promise<IUserModel | null> {
        const user = await User.findOne({ [field]: value });
        return user;
    }

     async deleteById(id: string): Promise<void> {
        await User.findByIdAndDelete(id);
    }

     async update(user: any): Promise<void> {
        await User.findByIdAndUpdate(user._id, user);
    }
}
