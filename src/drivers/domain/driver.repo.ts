import { Driver } from './drivers';

export default interface DriverRepository {
  createMany: (drivers: Driver[]) => Promise<Driver[]>;
  create: (driver: Driver) => Promise<Driver>;
  search: (query: { key: string; value: unknown }) => Promise<Driver[]>;
  find: (id: string) => Promise<Driver | null>;
  update: (driver: Partial<Driver>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
