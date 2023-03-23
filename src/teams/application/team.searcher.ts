import Team from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamSearcher {
  constructor(private repo: TeamRepository) {}

  async execute(query: { key: string; value: unknown }): Promise<Team[]> {
    const data = await this.repo.search(query);
    return data;
  }
}
