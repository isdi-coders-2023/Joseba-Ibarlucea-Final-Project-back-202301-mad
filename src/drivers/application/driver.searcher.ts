import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverSearcher {
  constructor(private repo: DriverRepository) {}

  async execute(query: { key: string; value: unknown }): Promise<Driver[]> {
    const data = await this.repo.search(query);
    return data;
  }
}
