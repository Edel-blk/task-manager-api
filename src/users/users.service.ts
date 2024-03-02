import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return this.userModel.find();
  }

  async createUser(createUser: CreateUserDTO) {
    console.log(createUser);
    const newUser = new this.userModel(createUser);
    await newUser.save();

    return newUser;
  }

  async updateUser(id: string, updateFields: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
