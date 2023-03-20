import { Team } from './team';

export default interface TeamRepository {
  query: () => Promise<Team[]>;
  create: (team: Team) => Promise<Team>;
  createMany: (teams: Team[]) => Promise<Team[]>;
  search: (query: { key: string; value: unknown }) => Promise<Team[]>;
  find: (id: string) => Promise<Team | null>;
  update: (team: Partial<Team>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
