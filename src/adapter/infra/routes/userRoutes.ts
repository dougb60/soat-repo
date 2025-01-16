import { Router } from "express";
import { container } from "../config/iocContainer";
import { UserController } from "../../driver/controllers/userController";
import cors from "cors";

const userRoutes = Router();

userRoutes.use(cors({ origin: "*" }));

const userController = container.get(UserController);

userRoutes.post("/user/create", userController.createUser.bind(userController));
userRoutes.get("/user/:cpf", userController.findUserByCPF.bind(userController));

export { userRoutes };
