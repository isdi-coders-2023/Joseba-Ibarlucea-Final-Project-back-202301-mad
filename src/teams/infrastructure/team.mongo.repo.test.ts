import { TeamModel } from '../../server/domain/team.mongo.model';
import { Team } from '../domain/team';
import TeamMongoRepo from './team.mongo.repo';

describe('Given TeamMongoRepo', () => {
  const mockModel = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    insertMany: jest.fn(),
  } as unknown as typeof TeamModel;

  const repo = new TeamMongoRepo(mockModel);

  describe('When the insertMany method is called', () => {
    test('Then it should call the insertMany method', async () => {
      (mockModel.insertMany as jest.Mock).mockResolvedValue([]);

      await repo.createMany([]);

      expect(mockModel.insertMany).toHaveBeenCalled();
    });
  });

  describe('When the create method is called', () => {
    test('Then it should call the create method', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue([{ name: 'F1 Team' }]);

      await repo.create({ name: 'F1 Team' } as Team);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When the search method is called', () => {
    test('Then it should call the find method', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue([{ poles: 2 }]);

      await repo.search({ key: 'poles', value: 2 });

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
  describe('When the find method is called', () => {
    test('Then it should call the findById method', async () => {
      (mockModel.findById as jest.Mock).mockResolvedValue([{ id: '33' }]);

      await repo.find('33');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });
  describe('When the update method is called', () => {
    test('Then it should call the findByIdAndUpdate method', async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([
        { id: '2' },
      ]);

      await repo.update({ id: '2' } as Team);

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
