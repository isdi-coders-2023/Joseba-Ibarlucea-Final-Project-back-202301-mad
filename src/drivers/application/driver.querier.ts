import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverQuerier {
  constructor(private repo: DriverRepository) {}
  async execute(): Promise<Driver[]> {
    return this.repo.query();
  }
}
