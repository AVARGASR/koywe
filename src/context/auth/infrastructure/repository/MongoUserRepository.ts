import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { UserPersistRepository } from '../../domain/contracts/UserPersistRepository';
import { User } from '../../domain/contracts/class/User';

export type UserDocument = User & Document;

@Injectable()
export class MongoUserRepository implements UserPersistRepository {
  constructor(
    @InjectModel('user') private readonly model: Model<UserDocument>,
  ) {}

  async findByUsername(username: string) {
    const doc = await this.model
      .findOne({ username })
      .select('+password')
      .exec();
    return doc ? new User(doc.id, doc.username, doc.password) : null;
  }

  async create(user: User) {
    await new this.model({
      _id: user.id ?? uuid(),
      username: user.username,
      password: user.password,
    }).save();
  }
}
