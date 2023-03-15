import UserUpdater from './user.updater';
import UserRepository from '../domain/user.repo';
import User from '../domain/user';

describe('Given UserUpdater use case', () => {
  const repo = {
    update: jest.fn(),
  } as unknown as UserRepository;

  const userUpdater = new UserUpdater(repo);
  describe('When the execute method is called', () => {
    test('Then repo.update should been called', async () => {
      (repo.update as jest.Mock).mockResolvedValue([]);

      await userUpdater.execute({} as User);

      expect(repo.update).toHaveBeenCalled();
    });
  });
});
