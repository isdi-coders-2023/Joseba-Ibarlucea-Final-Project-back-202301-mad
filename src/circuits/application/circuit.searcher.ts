import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitSearcher {
  constructor(private repo: CircuitRepository) {}

  async execute(query: { key: string; value: unknown }): Promise<Circuit[]> {
    const data = await this.repo.search(query);
    return data;
  }
}
