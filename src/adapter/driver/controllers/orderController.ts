import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { OrderService } from "../../../core/applications/services/orderService";
import { OrderStatusEnum } from "../../../core/domain/enums/order";

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  private createOrderSchema = z.object({
    orderDate: z.string().nonempty("A data é obrigatória"),
    status: z.string().nonempty("O status é obrigatório"),
    items: z
      .array(
        z.object({
          productId: z.number(),
          quantity: z.number(),
        })
      )
      .nonempty("Necessário incluir itens"),
  });

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = this.createOrderSchema.parse(req.body);
      const { items, orderDate, status } = validatedBody;

      const setOrderDate = new Date(orderDate);
      const parsedStatus =
        OrderStatusEnum[status as keyof typeof OrderStatusEnum];

      const order = await this.orderService.createOrder({
        orderDate: setOrderDate,
        items,
        status: parsedStatus,
      });

      res.status(order.status).json({ response: order.response });
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

  async listOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.listOrder();

      if (order.status === 404) {
        res.status(order.status).json({ message: "nenhuma ordem encontrada!" });
        return;
      }

      res.status(order.status).json({ response: order.response });
    } catch (error) {
      res.status(500).json({ response: `Error => ${error}` });
    }
  }
}
