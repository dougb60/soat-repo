import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { UserService } from "../../../core/applications/services/userService";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  private createUserSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    cpf: z.string().nonempty("O CPF é obrigatório"),
    email: z
      .string()
      .email("E-mail inválido")
      .nonempty("O Email é obrigatório"),
  });

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = this.createUserSchema.parse(req.body);
      const { name, cpf, email } = validatedBody;

      const user = await this.userService.createUser({ cpf, email, name });

      res.status(user.status).json({ response: user.response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({ response: `Error => ${error}` });
    }
  }

  async findUserByCPF(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.params;

      if (typeof cpf !== "string") {
        res.status(400).json({ message: "CPF precisa ser informado!" });
      }

      const user = await this.userService.findUserByCPF(cpf as string);

      if (user.status === 404) {
        res.status(user.status).json({ message: "Usuário não encontrado!" });
        return;
      }

      res.status(user.status).json({ response: user.response });
    } catch (error) {
      res.status(500).json({ response: `Error => ${error}` });
    }
  }
}
