import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserPersistRepository } from '../domain/contracts/UserPersistRepository';
import { PasswordHasher } from './class/PasswordHasher';
import { User } from '../domain/contracts/class/User';

@Injectable()
export class UserRegister {
  constructor(
    @Inject('UserPersistRepository')
    private readonly repository: UserPersistRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async run(user: string, password: string): Promise<void> {
    if (await this.repository.findByUsername(user))
      throw new ConflictException('Username already exists');

    const hash = await this.hasher.hash(password);
    await this.repository.create(new User(uuid(), user, hash));
  }
}
