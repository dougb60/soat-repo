import { inject, injectable } from "inversify";
import { IProductRepository } from "../ports/repositories/productRepository";
import { Product } from "../../domain/entities/product";
import { ReturnType } from "../interfaces/apiInterfaces";
import { IOrderRepository } from "../ports/repositories/orderRepository";
import { Order } from "../../domain/entities/order";
import { OrderStatusEnum } from "../../domain/enums/order";

@injectable()
export class OrderService {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository,
    @inject("ProductRepository") private productRepository: IProductRepository
  ) {}

  async createOrder(product: {
    orderDate: Date;
    status: OrderStatusEnum;
    items: { productId: number; quantity: number }[];
  }): Promise<ReturnType<Order | { message: string }>> {
    try {
      const { items, orderDate, status } = product;

      const itemsArray: Omit<Product & { quantity: number }, "categoryId">[] =
        [];
      for (const item of items) {
        const foundProduct = await this.productRepository.findProduct(
          item.productId
        );
        if (!foundProduct) {
          return {
            status: 404,
            response: {
              message: `Produto não cadastrado! id:${item.productId}`,
            },
          };
        }

        itemsArray.push({ ...foundProduct, quantity: item.quantity });
      }

      const totalPrice = itemsArray.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      const newOrder = await this.orderRepository.createOrder({
        orderDate,
        status,
        items: itemsArray,
        totalPrice,
      });

      if (newOrder) {
        const orderReturn = await this.orderRepository.findOrder(newOrder.id);
        if (orderReturn) {
          return { status: 200, response: orderReturn };
        }
      }

      return { status: 500, response: { message: "Erro ao inserir produto!" } };
    } catch (error) {
      return { status: 500, response: { message: error as string } };
    }
  }

  async listOrder(): Promise<ReturnType<Order[] | { message: string }>> {
    try {
      const products = await this.orderRepository.listOrder();

      if (products && products.length > 0)
        return { status: 200, response: products };

      return { status: 404, response: { message: "Nenhum pedido encontrado" } };
    } catch (error) {
      return { status: 500, response: { message: error as string } };
    }
  }
}
