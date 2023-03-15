import User from '../domain/user';
import UserRepository from '../domain/user.repo';

export default class UserRegister {
  constructor(private repo: UserRepository) {}

  async execute(user: User): Promise<User> {
    const data = await this.repo.create(user);
    return data;
  }
}
