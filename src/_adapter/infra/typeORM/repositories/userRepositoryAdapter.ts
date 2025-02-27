import { injectable } from "inversify";
import { IUserRepository } from "../../../../_core/applications/ports/repositories/userRepository";
import { ReturnType } from "../../../../_core/applications/interfaces/apiInterfaces";
import { User } from "../../../../_core/domain/entities/user";
import { AppDataSource } from "../config";
import { UserEntity } from "../../../../external/typeORM/entities/user";
import { Repository } from "typeorm";

@injectable()
export class UserRepositoryAdapter implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async createUser(user: {
    name: string;
    cpf: string;
    email: string;
  }): Promise<User | null> {
    try {
      const newUser = this.repository.create(user);
      const createdUser = await this.repository.save(newUser);

      return createdUser || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async findUserByCPF(cpf: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({ where: { cpf } });

      return user || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }
}
