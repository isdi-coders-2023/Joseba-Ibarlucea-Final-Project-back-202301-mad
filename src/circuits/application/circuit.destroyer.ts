import CircuitRepository from '../domain/circuit.repo';

export default class CircuitDestroyer {
  constructor(private repo: CircuitRepository) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
