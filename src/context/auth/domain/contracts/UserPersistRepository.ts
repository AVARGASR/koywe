import { User } from './class/User';

export interface UserPersistRepository {
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
