import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitUpdater {
  constructor(private repo: CircuitRepository) {}

  async execute(circuit: Partial<Circuit>): Promise<void> {
    await this.repo.update(circuit);
  }
}
