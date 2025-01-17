import { Router } from "express";
import { container } from "../config/iocContainer";
import { UserController } from "../../driver/controllers/userController";
import cors from "cors";
import { OrderController } from "../../driver/controllers/orderController";

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
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro na requisição
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
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
orderRoutes.get("/order", orderController.listOrder.bind(orderController));

export { orderRoutes };
