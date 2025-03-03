import { Order } from "../entities/order";

import { ProductRepository } from "../../Product/interfaces/repositories";
import { BusinessError } from "../../utils/errors";
import { CreateOrderRequestDTO } from "../interfaces/dtos";
import { OrderRepository } from "../interfaces/repositories";

export class OrderUseCase {
  static async createOrder(
    orderData: CreateOrderRequestDTO,
    repository: OrderRepository,
    productRepository: ProductRepository
  ): Promise<Order | null> {
    try {
      const itemsArray: {
        productId: number;
        quantity: number;
        price: number;
      }[] = [];
      for (const item of orderData.items) {
        const foundProduct = await productRepository.findById(item.productId);
        if (!foundProduct) {
          throw new BusinessError("Produto não encontrado!", 404);
        }
        itemsArray.push({
          productId: foundProduct.id,
          quantity: item.quantity,
          price: foundProduct.price,
        });
      }

      const totalPrice = itemsArray.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return await repository.createOrder({
        orderDate: orderData.orderDate,
        status: orderData.status,
        items: itemsArray,
        totalPrice,
      });
    } catch (error) {
      throw error;
    }
  }

  static async listOrders(repository: OrderRepository): Promise<Order[]> {
    try {
      const orders = await repository.listOrders();

      if (!orders) {
        throw new BusinessError("Nenhum pedido encontrado!", 404);
      }

      return orders;
    } catch (error) {
      throw error;
    }
  }
}
