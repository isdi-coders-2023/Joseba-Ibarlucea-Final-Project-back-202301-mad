import { Circuit } from './circuit';

export default interface CircuitRepository {
  query: () => Promise<Circuit[]>;
  createMany: (circuits: Circuit[]) => Promise<Circuit[]>;
  create: (circuits: Circuit) => Promise<Circuit>;
  search: (query: { key: string; value: unknown }) => Promise<Circuit[]>;
  find: (id: string) => Promise<Circuit | null>;
  update: (circuits: Partial<Circuit>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
