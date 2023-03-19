import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverUpdater {
  constructor(private repo: DriverRepository) {}

  async execute(driver: Partial<Driver>): Promise<void> {
    await this.repo.update(driver);
  }
}
