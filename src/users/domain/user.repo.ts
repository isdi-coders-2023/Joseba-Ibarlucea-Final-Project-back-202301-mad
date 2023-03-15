import User from './user';

export default interface UserRepository {
  create: (user: User) => Promise<User>;
  search: (query: { key: string; value: unknown }) => Promise<User[]>;
  find: (id: string) => Promise<User | null>;
  update: (user: Partial<User>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
