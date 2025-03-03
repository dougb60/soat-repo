import { ProductRepository } from "../../Product/interfaces/repositories";
import { CreateOrderRequestDTO } from "../interfaces/dtos";
import { OrderRepository } from "../interfaces/repositories";
import { OrderJsonPresenter } from "../presenters/orderPresenter";
import { OrderUseCase } from "../useCases/orderUseCase";

export class OrderController {
  static async createOrder(
    orderData: CreateOrderRequestDTO,
    repository: OrderRepository,
    productRepository: ProductRepository,
    presenter: OrderJsonPresenter
  ) {
    const order = await OrderUseCase.createOrder(
      orderData,
      repository,
      productRepository
    );
    return presenter.toResponse(order, "Pedido criado com sucesso", true);
  }

  static async listOrders(
    repository: OrderRepository,
    presenter: OrderJsonPresenter
  ) {
    const orders = await OrderUseCase.listOrders(repository);
    return presenter.toResponseList(orders, "Pedidos listados com sucesso");
  }
}
