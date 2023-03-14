import User from '../domain/user';
import UserRepository from '../domain/user.repo';

export default class UserUpdater {
  constructor(private repo: UserRepository) {}

  async execute(user: Partial<User>): Promise<void> {
    await this.repo.update(user);
  }
}
