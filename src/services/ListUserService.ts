import { classToPlain } from 'class-transformer';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

class ListUserService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const users = await usersRepositories.find();

    return classToPlain(users);
  }
}

export { ListUserService };
