import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitQuerier {
  constructor(private repo: CircuitRepository) {}

  async execute(): Promise<Circuit[]> {
    return this.repo.query();
  }
}
