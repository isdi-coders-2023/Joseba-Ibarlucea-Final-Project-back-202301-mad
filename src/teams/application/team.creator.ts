import Team from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamCreator {
  constructor(private repo: TeamRepository) {}

  async execute(team: Team): Promise<Team> {
    const data = await this.repo.create(team);
    return data;
  }
}
