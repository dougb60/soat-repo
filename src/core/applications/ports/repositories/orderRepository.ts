import { Order } from "../../../domain/entities/order";
import { Product } from "../../../domain/entities/product";
import { OrderStatusEnum } from "../../../domain/enums/order";

type CreateOrderRepository = {
  items: Omit<Product & { quantity: number }, "categoryId">[];
  orderDate: Date;
  status: OrderStatusEnum;
  totalPrice: number;
};

export interface IOrderRepository {
  createOrder(order: CreateOrderRepository): Promise<Pick<Order, "id"> | null>;
  listOrder(): Promise<Order[] | null>;
  findOrder(id: number): Promise<Order | null>;
}
