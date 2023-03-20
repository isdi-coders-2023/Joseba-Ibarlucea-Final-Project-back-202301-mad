import { Team } from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamCreateMany {
  constructor(private repo: TeamRepository) {}

  async execute(teams: Team[]): Promise<Team[]> {
    const data = await this.repo.createMany(teams);
    return data;
  }
}
