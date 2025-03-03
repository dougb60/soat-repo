import { DBConnection } from "../../interfaces/DBConnection";
import { Order } from "../entities/order";
import { CreateOrderRequestDTO } from "../interfaces/dtos";
import { OrderRepository } from "../interfaces/repositories";

export class OrderGateway implements OrderRepository {
  private readonly ORDER_TABLE_NAME = "orders";

  constructor(private dbConnection: DBConnection<any>) {}

  async createOrder(
    order: CreateOrderRequestDTO & { totalPrice: number }
  ): Promise<Order | null> {
    const result = await this.dbConnection.save(this.ORDER_TABLE_NAME, order);
    return Order.create(
      result?.id,
      result?.orderDate,
      result?.status,
      result?.items,
      result?.totalPrice
    );
  }

  async listOrders(): Promise<Order[] | null> {
    const result = await this.dbConnection.findAll(this.ORDER_TABLE_NAME);
    return result
      .map((order) =>
        Order.create(
          order?.id,
          order?.orderDate,
          order?.status,
          order?.items,
          order?.totalPrice
        )
      )
      .filter((order): order is Order => order !== null);
  }
}
