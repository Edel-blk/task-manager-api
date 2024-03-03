import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return this.userModel.find();
  }

  async createUser(createUser: CreateUserDTO) {
    const foundUser = await this.userModel.findOne({
      email: createUser.email,
    });

    if (foundUser) {
      throw new NotFoundException('This email is taken');
    }

    const hash = await bcrypt.hash(createUser.password, 10);
    const userData = { ...createUser, password: hash };
    const newUser = new this.userModel(userData);
    await newUser.save();

    return newUser;
  }

  async updateUser(id: string, updateFields: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async searchUser({ email, password }: LoginUserDTO) {
    const user: any = await this.userModel.findOne({
      email,
    });

    console.log(user);

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    console.log(password, user);

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
