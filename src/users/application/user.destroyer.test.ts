import UserDestroyer from './user.destroyer';
import UserRepository from '../domain/user.repo';

describe('Given UserDestroyer use case', () => {
  const repo = {
    delete: jest.fn(),
  } as unknown as UserRepository;

  const userDestroyer = new UserDestroyer(repo);
  describe('When the execute method is called', () => {
    test('Then repo.delete should been called', async () => {
      (repo.delete as jest.Mock).mockResolvedValue([]);

      await userDestroyer.execute('2');

      expect(repo.delete).toHaveBeenCalled();
    });
  });
});
