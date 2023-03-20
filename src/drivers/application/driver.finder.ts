import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverFinder {
  constructor(private repo: DriverRepository) {}

  async execute(id: string): Promise<Driver | null> {
    const data = await this.repo.find(id);
    return data;
  }
}
