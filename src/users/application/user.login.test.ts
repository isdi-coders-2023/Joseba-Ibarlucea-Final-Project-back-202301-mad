import UserLogin from './user.login';
import UserRepository from '../domain/user.repo';

describe('Given UserLogin use case', () => {
  const repo = {
    search: jest.fn(),
  } as unknown as UserRepository;

  const userLogin = new UserLogin(repo);
  describe('When the execute method is called', () => {
    test('Then repo.search should been called', async () => {
      (repo.search as jest.Mock).mockResolvedValue([]);

      await userLogin.execute({ key: 'test', value: 'test' });

      expect(repo.search).toHaveBeenCalled();
    });
  });
});
