import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserPersistRepository } from 'src/context/auth/domain/contracts/UserPersistRepository';
import { PasswordHasher } from 'src/context/auth/application/class/PasswordHasher';
import { UserLogin } from 'src/context/auth/application/UserLogin';
import { User } from 'src/context/auth/domain/contracts/class/User';

describe('UserLogin', () => {
  const mockRepository = {
    findByUsername: jest.fn(),
  } as unknown as jest.Mocked<UserPersistRepository>;

  const mockHasher = {
    compare: jest.fn(),
  } as unknown as jest.Mocked<PasswordHasher>;

  // Mock de JwtService
  const mockJwtService = {
    sign: jest.fn(),
  } as unknown as jest.Mocked<JwtService>;

  let userLogin: UserLogin;

  beforeEach(() => {
    userLogin = new UserLogin(mockRepository, mockHasher, mockJwtService);
  });

  it('error with invalid credentials', async () => {
    const username = 'wrongUser';
    const password = 'wrongPassword';

    mockRepository.findByUsername.mockResolvedValue(null);

    await expect(userLogin.run(username, password)).rejects.toThrow(
      new UnauthorizedException('Invalid credentials'),
    );
  });

  it('error invalid password', async () => {
    const username = 'existingUser';
    const password = 'wrongPassword';

    const user = new User('user-id', username, 'hashedPassword');

    mockRepository.findByUsername.mockResolvedValue(user);

    mockHasher.compare.mockResolvedValue(false);

    await expect(userLogin.run(username, password)).rejects.toThrow(
      new UnauthorizedException('Invalid credentials'),
    );
  });

  it('return jwt with valid credentials', async () => {
    const username = 'existingUser';
    const password = 'correctPassword';
    const user = new User('user-id', username, 'hashedPassword');

    mockRepository.findByUsername.mockResolvedValue(user);
    mockHasher.compare.mockResolvedValue(true);

    const token = 'token-test';
    mockJwtService.sign.mockReturnValue(token);
    const result = await userLogin.run(username, password);
    expect(result.access_token).toBe(token);
    expect(mockRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(mockHasher.compare).toHaveBeenCalledWith(password, user.password);
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: user.id,
      username,
    });
  });
});
