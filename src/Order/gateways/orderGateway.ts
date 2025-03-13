import { DBConnection } from "../../interfaces/DBConnection";
import { Order } from "../entities/order";
import { CreateOrderRequestDTO } from "../interfaces/dtos";
import { OrderRepository } from "../interfaces/repositories";

export class OrderGateway implements OrderRepository {
  private readonly ORDER_TABLE_NAME = "orders";
  private dbConnection: DBConnection<Order>;

  constructor(dbConnection: DBConnection<any>) {
    this.dbConnection = dbConnection;
  }

  async createOrder(
    order: CreateOrderRequestDTO & { totalPrice: number }
  ): Promise<Order | null> {
    const result = await this.dbConnection.save(this.ORDER_TABLE_NAME, order);
    return Order.create(
      result?.id,
      result?.orderDate,
      result?.status,
      result?.items,
      result?.totalPrice,
      result?.code,
      result?.paymentStatus
    );
  }

  async listOrders(): Promise<Order[] | null> {
    const result = await this.dbConnection.findWithOrder(
      this.ORDER_TABLE_NAME,
      {
        orderBy: [
          {
            field: "status",
            direction: "ASC",
            customOrder: { PRONTO: 1, EM_PREPARACAO: 2, RECEBIDO: 3 },
          },
          { field: "orderDate", direction: "ASC" },
        ],
      }
    );

    return result
      .map((order) =>
        Order.create(
          order?.id,
          order?.orderDate,
          order?.status,
          order?.items,
          order?.totalPrice,
          order?.code,
          order?.paymentStatus
        )
      )
      .filter((order): order is Order => order !== null);
  }

  async findOrder(id: number): Promise<Order | null> {
    const result = await this.dbConnection.findOne(this.ORDER_TABLE_NAME, {
      id,
    });

    return Order.create(
      result?.id,
      result?.orderDate,
      result?.status,
      result?.items,
      result?.totalPrice,
      result?.code,
      result?.paymentStatus
    );
  }

  async findByCode(code: string): Promise<Order | null> {
    const result = await this.dbConnection.findOne(this.ORDER_TABLE_NAME, {
      code,
    });

    return Order.create(
      result?.id,
      result?.orderDate,
      result?.status,
      result?.items,
      result?.totalPrice,
      result?.code,
      result?.paymentStatus
    );
  }

  async updateOrderStatus(id: number, status: string): Promise<void> {
    await this.dbConnection.update(this.ORDER_TABLE_NAME, { id }, { status });
  }

  async updatePaymentStatus(id: number, paymentStatus: string): Promise<void> {
    await this.dbConnection.update(
      this.ORDER_TABLE_NAME,
      { id },
      { paymentStatus }
    );
  }
}
