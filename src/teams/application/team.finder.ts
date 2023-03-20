import { Team } from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamFinder {
  constructor(private repo: TeamRepository) {}

  async execute(id: string): Promise<Team | null> {
    const data = await this.repo.find(id);
    return data;
  }
}
