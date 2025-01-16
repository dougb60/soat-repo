import { Router } from "express";
import { container } from "../config/iocContainer";
import { UserController } from "../../driver/controllers/userController";
import cors from "cors";
import { OrderController } from "../../driver/controllers/orderController";

const orderRoutes = Router();

orderRoutes.use(cors({ origin: "*" }));

const orderController = container.get(OrderController);

orderRoutes.post(
  "/order/create",
  orderController.createOrder.bind(orderController)
);
orderRoutes.get("/order", orderController.listOrder.bind(orderController));

export { orderRoutes };
