import { CircuitModel } from '../../server/domain/circuit.mongo.model';
import { Circuit } from '../domain/circuit';
import CircuitMongoRepo from './circuit.mongo.repo';

describe('Given CircuitMongoRepo', () => {
  const mockModel = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    insertMany: jest.fn(),
  } as unknown as typeof CircuitModel;

  const repo = new CircuitMongoRepo(mockModel);

  describe('When the insertMany method is called', () => {
    test('Then it should call the insertMany method', async () => {
      (mockModel.insertMany as jest.Mock).mockResolvedValue([]);

      await repo.createMany([]);

      expect(mockModel.insertMany).toHaveBeenCalled();
    });
  });

  describe('When the create method is called', () => {
    test('Then it should call the create method', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue([]);

      await repo.create({} as Circuit);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When the search method is called', () => {
    test('Then it should call the find method', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue([]);

      await repo.search({ key: 'test', value: 'test' });

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
  describe('When the find method is called', () => {
    test('Then it should call the findById method', async () => {
      (mockModel.findById as jest.Mock).mockResolvedValue([]);

      await repo.find('id');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });
  describe('When the update method is called', () => {
    test('Then it should call the findByIdAndUpdate method', async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([]);

      await repo.update({} as Circuit);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
  describe('When the delete method is called', () => {
    test('Then it should call the findByIdAndDelete method', async () => {
      (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue([]);

      await repo.delete('id');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});
