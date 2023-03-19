import { Driver } from './drivers';

export default interface DriverRepository {
  createMany: (drivers: Driver[]) => Promise<Driver[]>;
  create?: (circuits: Driver) => Promise<Driver>;
  search?: (query: { key: string; value: unknown }) => Promise<Driver[]>;
  find?: (id: string) => Promise<Driver | null>;
  update?: (circuits: Partial<Driver>) => Promise<void>;
  delete?: (id: string) => Promise<void>;
}
