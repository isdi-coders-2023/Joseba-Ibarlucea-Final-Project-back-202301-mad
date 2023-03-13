import User from '../domain/user';
import UserRepository from '../domain/user.repo';

export default class UserLogin {
  constructor(private repo: UserRepository) {}

  async execute(query: { key: string; value: unknown }): Promise<User[]> {
    const data = await this.repo.search(query);
    return data;
  }
}
