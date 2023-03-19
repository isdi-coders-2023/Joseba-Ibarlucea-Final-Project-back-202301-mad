import { Team } from '../../teams/domain/team';
import TeamRepository from '../domain/driver.repo';

export default class TeamCreator {
  constructor(private repo: TeamRepository) {}

  async execute(team: Team): Promise<void> {}
}
