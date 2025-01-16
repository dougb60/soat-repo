import "reflect-metadata";
import { Container } from "inversify";
import { IUserRepository } from "../../../core/applications/ports/repositories/userRepository";
import { UserRepositoryAdapter } from "../typeORM/repositories/userRepositoryAdapter";
import { UserController } from "../../driver/controllers/userController";
import { UserService } from "../../../core/applications/services/userService";
import { IProductRepository } from "../../../core/applications/ports/repositories/productRepository";
import { ProductRepositoryAdapter } from "../typeORM/repositories/productRepositoryAdapter";
import { ProductController } from "../../driver/controllers/productController";
import { ProductService } from "../../../core/applications/services/productService";
import { IOrderRepository } from "../../../core/applications/ports/repositories/orderRepository";
import { OrderRepositoryAdapter } from "../typeORM/repositories/orderRepositoryAdapter";
import { OrderService } from "../../../core/applications/services/orderService";
import { ICategoryRepository } from "../../../core/applications/ports/repositories/categoryRepository";
import { CategoryRepositoryAdapter } from "../typeORM/repositories/categoryRepositoryAdapter";
import { OrderController } from "../../driver/controllers/orderController";

const container = new Container();

container.bind<IUserRepository>("UserRepository").to(UserRepositoryAdapter);
container
  .bind<IProductRepository>("ProductRepository")
  .to(ProductRepositoryAdapter);
container.bind<IOrderRepository>("OrderRepository").to(OrderRepositoryAdapter);
container
  .bind<ICategoryRepository>("CategoryRepository")
  .to(CategoryRepositoryAdapter);

container.bind<UserService>(UserService).toSelf();
container.bind<ProductService>(ProductService).toSelf();
container.bind<OrderService>(OrderService).toSelf();

container.bind<UserController>(UserController).toSelf();
container.bind<ProductController>(ProductController).toSelf();
container.bind<OrderController>(OrderController).toSelf();

export { container };
