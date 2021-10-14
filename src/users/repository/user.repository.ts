import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../entity/user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: any): Promise<User> {
    const newUser = new this.userModel(user);
    const userDb = await newUser.save();
    return userDb;
  }

  async findOne(userFilterQuery: any): Promise<User> {
    return this.userModel.findOne({ userFilterQuery });
  }
}
