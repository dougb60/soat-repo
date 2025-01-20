import { Router } from "express";
import { container } from "../config/iocContainer";
import { OrderController } from "../../driver/controllers/orderController";
import cors from "cors";

const orderRoutes = Router();

orderRoutes.use(cors({ origin: "*" }));

const orderController = container.get(OrderController);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-20T10:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: [RECEBIDO, PREPARACAO, PRONTO, FINALIZADO]
 *                 example: "RECEBIDO"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso
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
 *                       example: 2
 *                     orderDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-20T10:00:00.000Z"
 *                     orderItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 2
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                           price:
 *                             type: string
 *                             format: decimal
 *                             example: "55.80"
 *       400:
 *         description: Erro de validação na requisição
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
orderRoutes.post(
  "/order/create",
  orderController.createOrder.bind(orderController)
);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-20T10:00:00.000Z"
 *                   status:
 *                     type: string
 *                     example: "RECEBIDO"
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: number
 *                           example: 1
 *                         quantity:
 *                           type: number
 *                           example: 2
 *       404:
 *         description: Nenhum pedido encontrado
 *       500:
 *         description: Erro interno do servidor
 */
orderRoutes.get("/order", orderController.listOrder.bind(orderController));

export { orderRoutes };
