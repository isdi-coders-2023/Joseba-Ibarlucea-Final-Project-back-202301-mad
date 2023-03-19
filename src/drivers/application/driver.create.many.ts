import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverCreateMany {
  constructor(private repo: DriverRepository) {}

  async execute(drivers: Driver[]): Promise<void> {
    await this.repo.createMany(drivers);
  }
}
