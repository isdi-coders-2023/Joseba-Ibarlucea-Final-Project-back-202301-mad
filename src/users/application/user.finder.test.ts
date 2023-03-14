import UserRepository from '../domain/user.repo';
import UserFinder from './user.finder';

describe('Given UserFinder use case', () => {
  const repo = {
    find: jest.fn(),
  } as unknown as UserRepository;

  const userFinder = new UserFinder(repo);
  describe('When the execute method is called', () => {
    test('Then repo.find should been called', async () => {
      (repo.find as jest.Mock).mockResolvedValue([]);

      await userFinder.execute('2');

      expect(repo.find).toHaveBeenCalled();
    });
  });
});
