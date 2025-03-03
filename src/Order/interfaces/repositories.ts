import { Order } from "../entities/order";
import { CreateOrderRequestDTO } from "./dtos";

export interface OrderRepository {
  createOrder(
    order: CreateOrderRequestDTO & { totalPrice: number }
  ): Promise<Order | null>;
  listOrders(): Promise<Order[] | null>;
}
