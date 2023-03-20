import { TeamModel } from '../../server/domain/team.mongo.model';
import { Team } from '../domain/team';
import TeamRepository from '../domain/team.repo';

export default class TeamMongoRepo implements TeamRepository {
  constructor(private mongo: typeof TeamModel) {}
  async createMany(teams: Team[]): Promise<Team[]> {
    const data = await this.mongo.insertMany(teams);
    return data;
  }
  async create(team: Team): Promise<Team> {
    const data = await this.mongo.create(team);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<Team[]> {
    const data = await this.mongo.find({ [query.key]: query.value });
    return data;
  }
  async find(id: string): Promise<Team | null> {
    const data = await this.mongo.findById(id);
    return data;
  }
  async update(team: Partial<Team>): Promise<void> {
    await this.mongo.findByIdAndUpdate(team.id, team);
  }
  async delete(id: string): Promise<void> {
    await this.mongo.findByIdAndDelete(id);
  }
}
