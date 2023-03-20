import { CircuitModel } from '../../server/domain/circuit.mongo.model';
import { Circuit } from '../domain/circuit';
import CircuitRepository from '../domain/circuit.repo';

export default class CircuitMongoRepo implements CircuitRepository {
  constructor(private mongo: typeof CircuitModel) {}
  async createMany(circuits: Circuit[]): Promise<Circuit[]> {
    const data = await this.mongo.insertMany(circuits);
    return data;
  }
  async create(circuit: Circuit): Promise<Circuit> {
    const data = await this.mongo.create(circuit);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<Circuit[]> {
    const data = await this.mongo.find({ [query.key]: query.value });
    return data;
  }
  async find(id: string): Promise<Circuit | null> {
    const data = await this.mongo.findById(id);
    return data;
  }
  async update(circuit: Partial<Circuit>): Promise<void> {
    await this.mongo.findByIdAndUpdate(circuit.id, circuit);
  }
  async delete(id: string): Promise<void> {
    await this.mongo.findByIdAndDelete(id);
  }
}
