import { Circuit } from '../domain/circuit';
import TeamRepository from '../domain/circuit.repo';

export default class CircuitCreateMany {
  constructor(private repo: TeamRepository) {}

  async execute(circuits: Circuit[]): Promise<void> {
    await this.repo.createMany(circuits);
  }
}
