import { inject, injectable } from "inversify";
import { IUserRepository } from "../ports/repositories/userRepository";
import { User } from "../../domain/entities/user";
import { ReturnType } from "../interfaces/apiInterfaces";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async createUser(user: {
    name: string;
    cpf: string;
    email: string;
  }): Promise<ReturnType<User | { message: string }>> {
    try {
      const exists = await this.userRepository.findUserByCPF(user.cpf);

      if (!exists) {
        const newUser = await this.userRepository.createUser(user);

        if (newUser) return { response: newUser, status: 200 };
      }

      return { response: { message: "Erro ao criar usuário" }, status: 500 };
    } catch (error) {
      return { response: { message: error as string }, status: 500 };
    }
  }

  async findUserByCPF(
    cpf: string
  ): Promise<ReturnType<User | { message: string }>> {
    try {
      const user = await this.userRepository.findUserByCPF(cpf);

      if (user) return { response: user, status: 200 };

      return { response: { message: "Usuário não encontrado" }, status: 404 };
    } catch (error) {
      return { response: { message: error as string }, status: 500 };
    }
  }
}
