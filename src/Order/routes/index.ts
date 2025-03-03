import { Router } from "express";
import cors from "cors";
import { OrderController } from "../controllers/OrderController";
import { CreateOrdertValidator } from "../interfaces/dtos";
import { OrderJsonPresenter } from "../presenters/orderPresenter";
import { OrderGateway } from "../gateways/orderGateway";
import { ProductGateway } from "../../Product/gateways/productGateway";

export const orderRoutes = (dbConnection: any): Router => {
  const orderRoutes = Router();

  orderRoutes.use(cors({ origin: "*" }));

  const orderRepository = new OrderGateway(dbConnection);
  const orderPresenter = new OrderJsonPresenter();
  const productRepository = new ProductGateway(dbConnection);

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
   *       201:
   *         description: Pedido criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Pedido criado com sucesso"
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
   *                     status:
   *                       type: string
   *                       enum: [RECEBIDO, PREPARACAO, PRONTO, FINALIZADO]
   *                       example: "RECEBIDO"
   *                     items:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           productId:
   *                             type: number
   *                             example: 1
   *                           quantity:
   *                             type: number
   *                             example: 2
   *                     totalPrice:
   *                       type: number
   *                       format: decimal
   *                       example: 111.60
   *       400:
   *         description: Erro de validação na requisição
   *       404:
   *         description: Produto não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  orderRoutes.post("/order/create", async (req, res, next) => {
    try {
      const orderData = CreateOrdertValidator.validate(req.body);
      const response = await OrderController.createOrder(
        orderData,
        orderRepository,
        productRepository,
        orderPresenter
      );

      res.status(response.statusCode).json({ ...response.body });
    } catch (error) {
      next(error);
    }
  });

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
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Pedidos listados com sucesso"
   *                 response:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: number
   *                         example: 1
   *                       orderDate:
   *                         type: string
   *                         format: date-time
   *                         example: "2025-01-20T10:00:00.000Z"
   *                       status:
   *                         type: string
   *                         enum: [RECEBIDO, PREPARACAO, PRONTO, FINALIZADO]
   *                         example: "RECEBIDO"
   *                       items:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             productId:
   *                               type: number
   *                               example: 1
   *                             quantity:
   *                               type: number
   *                               example: 2
   *                       totalPrice:
   *                         type: number
   *                         format: decimal
   *                         example: 111.60
   *       404:
   *         description: Nenhum pedido encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  orderRoutes.get("/order", async (req, res, next) => {
    try {
      const response = await OrderController.listOrders(
        orderRepository,
        orderPresenter
      );

      res.status(response.statusCode).json({ ...response.body });
    } catch (error) {
      next(error);
    }
  });

  return orderRoutes;
};
