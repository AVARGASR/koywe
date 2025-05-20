import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPersistRepository } from '../domain/contracts/UserPersistRepository';
import { PasswordHasher } from './class/PasswordHasher';

@Injectable()
export class UserLogin {
  constructor(
    @Inject('UserPersistRepository')
    private readonly repo: UserPersistRepository,
    private readonly hasher: PasswordHasher,
    private readonly jwt: JwtService,
  ) {}

  async run(username: string, password: string) {
    const user = await this.repo.findByUsername(username);
    if (!user || !(await this.hasher.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return { access_token: this.jwt.sign({ sub: user.id, username }) };
  }
}
