import { Router } from "express";
import { container } from "../config/iocContainer";
import { UserController } from "../../driver/controllers/userController";
import cors from "cors";

const userRoutes = Router();

userRoutes.use(cors({ origin: "*" }));

const userController = container.get(UserController);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *                 example: "999.999.999-99"
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao.silva@example.com
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Soat Fiap
 *                     cpf:
 *                       type: string
 *                       example: 999.999.999-99
 *                     email:
 *                       type: string
 *                       example: soat@teste.com
 *                   description: Dados do usuário criado
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro de validação
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: name
 *                       message:
 *                         type: string
 *                         example: O nome é obrigatório
 *       500:
 *         description: Erro interno no servidor
 */
userRoutes.post("/user/create", userController.createUser.bind(userController));

/**
 * @swagger
 * /user/{cpf}:
 *   get:
 *     summary: Busca um usuário pelo CPF
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         description: CPF do usuário a ser buscado
 *         schema:
 *           type: string
 *           example: "999.999.999-99"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Soat Fiap
 *                     cpf:
 *                       type: string
 *                       example: 999.999.999-99
 *                     email:
 *                       type: string
 *                       example: soat@teste.com
 *                   description: Dados do usuário
 *       400:
 *         description: CPF precisa ser informado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CPF precisa ser informado!
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado!
 *       500:
 *         description: Erro interno no servidor
 */
userRoutes.get("/user/:cpf", userController.findUserByCPF.bind(userController));

export { userRoutes };
