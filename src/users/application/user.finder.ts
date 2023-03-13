import User from '../domain/user';
import UserRepository from '../domain/user.repo';

export default class UserFinder {
  constructor(private repo: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const data = await this.repo.find(id);
    return data;
  }
}
