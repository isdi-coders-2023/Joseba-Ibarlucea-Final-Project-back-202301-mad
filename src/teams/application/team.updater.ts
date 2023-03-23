import  Team  from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamUpdater {
  constructor(private repo: TeamRepository) {}

  async execute(team: Partial<Team>): Promise<void> {
    await this.repo.update(team);
  }
}
