import { Injectable } from '@nestjs/common';
import { UserLogin } from './UserLogin';
import { UserRegister } from './UserRegister';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly register: UserRegister,
    private readonly login: UserLogin,
  ) {}

  async signUp(username: string, password: string) {
    await this.register.run(username, password);
    return this.login.run(username, password);
  }

  async signIn(username: string, password: string) {
    return this.login.run(username, password);
  }
}
