// adapters/typeORM/TypeORMConfig.ts
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user";
import { ProductEntity } from "./entities/product";
import { OrderEntity } from "./entities/order";
import { CategoryEntity } from "./entities/category";
import { OrderItemEntity } from "./entities/orderItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "soat",
  password: "soat",
  database: "soat_desafio",
  logging: true,
  entities: [
    UserEntity,
    ProductEntity,
    OrderEntity,
    CategoryEntity,
    OrderItemEntity,
  ],
  migrations: [__dirname + "/migrations/*.ts"],
});
