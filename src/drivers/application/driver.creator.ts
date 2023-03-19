import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverCreator {
  constructor(private repo: DriverRepository) {}

  async execute(driver: Driver): Promise<Driver> {
    const data = await this.repo.create(driver);
    return data;
  }
}
