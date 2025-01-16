import { User } from "../../../domain/entities/user";
import { ReturnType } from "../../interfaces/apiInterfaces";

type CreateUserProps = {
  name: string;
  cpf: string;
  email: string;
};

export interface IUserRepository {
  findUserByCPF(cpf: string): Promise<User | null>;
  createUser(user: CreateUserProps): Promise<User | null>;
}
