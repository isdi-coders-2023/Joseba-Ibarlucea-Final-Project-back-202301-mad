import { Team } from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamQuery {
  constructor(private repo: TeamRepository) {}

  async execute(): Promise<Team[]> {
    const data = await this.repo.query();
    return data;
  }
}
