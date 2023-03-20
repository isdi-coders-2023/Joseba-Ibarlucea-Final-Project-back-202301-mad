import { DriverModel } from '../../server/domain/driver.mongo.model';
import { Driver } from '../domain/drivers';
import DriverMongoRepo from './drivers.mongo.repo';

describe('Given DriverMongoRepo', () => {
  const mockModel = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    insertMany: jest.fn(),
  } as unknown as typeof DriverModel;

  const repo = new DriverMongoRepo(mockModel);

  describe('When the insertMany method is called', () => {
    test('Then it should call the insertMany method', async () => {
      (mockModel.insertMany as jest.Mock).mockResolvedValue([]);

      await repo.createMany([]);

      expect(mockModel.insertMany).toHaveBeenCalled();
    });
  });

  describe('When the create method is called', () => {
    test('Then it should call the create method', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue([{ name: 'pepe' }]);

      await repo.create({ name: 'pepe' } as Driver);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When the search method is called', () => {
    test('Then it should call the find method', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue([{ name: 'Mikey' }]);

      await repo.search({ key: 'name', value: 'Mikey' });

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
  describe('When the find method is called', () => {
    test('Then it should call the findById method', async () => {
      (mockModel.findById as jest.Mock).mockResolvedValue([
        { id: '2', nationality: 'Spanish' },
      ]);

      await repo.find('2');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });
  describe('When the update method is called', () => {
    test('Then it should call the findByIdAndUpdate method', async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([
        { id: '2', championships: 7 },
      ]);

      await repo.update({ id: '2' } as Driver);

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
