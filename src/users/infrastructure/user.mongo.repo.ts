import UserRepository from '../domain/user.repo';
import { UserModel } from '../../server/domain/user.mongo.model';
import User from '../domain/user';

export default class UserMongoRepo implements UserRepository {
  constructor(private mongo: typeof UserModel) {}
  async create(user: User): Promise<User> {
    const data = await this.mongo.create(user);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<User[]> {
    const data = await this.mongo.find({ [query.key]: query.value });
    return data;
  }
  async find(id: string): Promise<User | null> {
    const data = await this.mongo.findById(id);
    return data;
  }
  async update(user: Partial<User>): Promise<void> {
    await this.mongo.findByIdAndUpdate(user.id, user);
  }
  async delete(id: string): Promise<void> {
    await this.mongo.findByIdAndDelete(id);
  }
}
