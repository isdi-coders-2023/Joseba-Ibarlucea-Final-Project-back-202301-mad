import TeamRepository from '../domain/team.repo';

export default class TeamDestroyer {
  constructor(private repo: TeamRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
