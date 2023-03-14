import UserRepository from '../domain/user.repo';

export default class UserDestroyer {
  constructor(private repo: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
