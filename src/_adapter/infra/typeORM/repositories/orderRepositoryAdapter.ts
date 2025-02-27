import { injectable } from "inversify";
import { Repository } from "typeorm";
import { IOrderRepository } from "../../../../_core/applications/ports/repositories/orderRepository";
import { Order } from "../../../../_core/domain/entities/order";
import { Product } from "../../../../_core/domain/entities/product";
import { OrderStatusEnum } from "../../../../_core/domain/enums/order";
import { AppDataSource } from "../config";
import { OrderEntity } from "../../../../external/typeORM/entities/order";
import { OrderItemEntity } from "../../../../external/typeORM/entities/orderItem";
import { OrderItems } from "../../../../_core/domain/entities/orderItems";

@injectable()
export class OrderRepositoryAdapter implements IOrderRepository {
  private repository: Repository<OrderEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(OrderEntity);
  }

  async createOrder(order: {
    orderDate: Date;
    status: OrderStatusEnum;
    items: Omit<Product & { quantity: number }, "categoryId">[];
    totalPrice: number;
  }): Promise<Pick<Order, "id"> | null> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createOrder = queryRunner.manager.create(OrderEntity, {
        orderDate: order.orderDate,
        status: order.status,
      });

      const savedOrder = await queryRunner.manager.save(
        OrderEntity,
        createOrder
      );

      const orderItems = order.items.map((product) =>
        queryRunner.manager.create(OrderItemEntity, {
          productId: product.id,
          order: savedOrder,
          product: product,
          price: order.totalPrice,
          quantity: product.quantity,
        })
      );

      await queryRunner.manager.save(OrderItemEntity, orderItems);

      await queryRunner.commitTransaction();

      return {
        id: savedOrder.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Database error => ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findOrder(
    id: number
  ): Promise<(Omit<Order, "items"> & { orderItems: OrderItems[] }) | null> {
    try {
      const order = await this.repository.findOne({
        where: { id },
        relations: ["items"],
      });

      return order?.id && order?.orderDate && order?.status && order?.items
        ? {
            id: order.id,
            orderDate: order.orderDate,
            status:
              OrderStatusEnum[order.status as keyof typeof OrderStatusEnum],
            orderItems: order.items,
          }
        : null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async listOrder(): Promise<Omit<Order, "items">[] | null> {
    try {
      const orders = await this.repository.find({ relations: ["items"] });

      if (orders)
        return orders.map((x) => ({
          id: x.id,
          orderDate: x.orderDate,
          status: OrderStatusEnum[x.status as keyof typeof OrderStatusEnum],
          orderItems: x.items,
        }));

      return null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }
}
