import UserRegister from './user.register';
import UserRepository from '../domain/user.repo';
import User from '../domain/user';

describe('Given UserRegister use case', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as UserRepository;

  const userRegister = new UserRegister(repo);
  describe('When the execute method is called', () => {
    test('Then repo.create should been called', async () => {
      (repo.create as jest.Mock).mockResolvedValue([]);

      await userRegister.execute({} as User);

      expect(repo.create).toHaveBeenCalled();
    });
  });
});
