import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitFinder {
  constructor(private repo: CircuitRepository) {}

  async execute(id: string): Promise<Circuit | null> {
    const data = await this.repo.find(id);
    return data;
  }
}
