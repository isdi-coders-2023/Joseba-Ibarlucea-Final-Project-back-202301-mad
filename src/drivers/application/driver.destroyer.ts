import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';

export default class DriverDestroyer {
  constructor(private repo: DriverRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
    ;
  }
}
