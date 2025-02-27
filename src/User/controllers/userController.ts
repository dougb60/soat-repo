import { APIResponse } from "../../interfaces/Adapter";
import { CreateUserRequestDTO } from "../interfaces/dtos";
import { UserResponseDTO } from "../interfaces/presenters";
import { UserRepository } from "../interfaces/repositories";
import { UserJsonPresenter } from "../presenters/userPresenter";
import { UserUseCase } from "../useCases/userUseCase";

export class UserController {
  static async findUserByCPF(
    cpf: string,
    repository: UserRepository,
    presenter: UserJsonPresenter
  ): Promise<APIResponse<UserResponseDTO>> {
    const user = await UserUseCase.findUserByCPF(cpf, repository);
    return presenter.toResponse(user, "Usuário encontrado com sucesso");
  }

  static async createUser(
    userDTO: CreateUserRequestDTO,
    repository: UserRepository,
    presenter: UserJsonPresenter
  ): Promise<APIResponse<UserResponseDTO>> {
    const user = await UserUseCase.createUser(userDTO, repository);
    return presenter.toResponse(user, "Usuário criado com sucesso", true);
  }
}
