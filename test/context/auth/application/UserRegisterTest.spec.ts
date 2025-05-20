import 'reflect-metadata';
import { PasswordHasher } from 'src/context/auth/application/class/PasswordHasher';
import { UserRegister } from 'src/context/auth/application/UserRegister';
import { UserPersistRepository } from 'src/context/auth/domain/contracts/UserPersistRepository';

describe('UserRegister', () => {
  const mockRepository = {
    findByUsername: jest.fn(),
    create: jest.fn(),
  } as jest.Mocked<UserPersistRepository>;

  const mockHasher = {
    hash: jest.fn(),
  } as unknown as jest.Mocked<PasswordHasher>;

  let userRegister: UserRegister;

  beforeEach(() => {
    userRegister = new UserRegister(mockRepository, mockHasher);
  });

  it('create new user and save User', async () => {
    const username = 'newUser';
    const password = 'password123';
    const hash = 'hashedPassword123';

    mockRepository.findByUsername.mockResolvedValue(null);

    mockHasher.hash.mockResolvedValue(hash);

    await userRegister.run(username, password);

    expect(mockRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(mockHasher.hash).toHaveBeenCalledWith(password);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username,
        password: hash,
      }),
    );
  });
});
