import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasher {
  private readonly rounds = 12;
  hash(plain: string) {
    return bcrypt.hash(plain, this.rounds);
  }
  compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
