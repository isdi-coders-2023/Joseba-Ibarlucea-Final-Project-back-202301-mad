import { Driver } from '../domain/drivers';

import DriverRepository from '../domain/driver.repo';
import { DriverModel } from '../../server/domain/driver.mongo.repo';

export default class DriverMongoRepo implements DriverRepository {
  constructor(private mongo: typeof DriverModel) {}
  async createMany(drivers: Driver[]): Promise<Driver[]> {
    const data = await this.mongo.insertMany(drivers);
    return data;
  }
  async create(driver: Driver): Promise<Driver> {
    const data = await this.mongo.create(driver);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<Driver[]> {
    const data = await this.mongo.find({ [query.key]: query.value });
    return data;
  }
  async find(id: string): Promise<Driver | null> {
    const data = await this.mongo.findById(id);
    return data;
  }
  async update(driver: Partial<Driver>): Promise<void> {
    await this.mongo.findByIdAndUpdate(driver.id, driver);
  }
  async delete(id: string): Promise<void> {
    await this.mongo.findByIdAndDelete(id);
  }
}
