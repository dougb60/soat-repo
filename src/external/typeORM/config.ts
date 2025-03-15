// adapters/typeORM/TypeORMConfig.ts
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user";
import { ProductEntity } from "./entities/product";
import { OrderEntity } from "./entities/order";
import { CategoryEntity } from "./entities/category";
import { OrderItemEntity } from "./entities/orderItem";
import "dotenv/config";

console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD);
console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "soat_desafio",
  logging: true,
  synchronize: false,
  entities: [
    UserEntity,
    ProductEntity,
    OrderEntity,
    CategoryEntity,
    OrderItemEntity,
  ],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
