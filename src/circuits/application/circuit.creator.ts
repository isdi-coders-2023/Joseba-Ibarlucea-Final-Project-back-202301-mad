import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitCreator {
  constructor(private repo: CircuitRepository) {}

  async execute(circuit: Circuit): Promise<Circuit> {
    const data = await this.repo.create(circuit);
    return data;
  }
}
