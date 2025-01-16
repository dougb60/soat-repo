import { Router } from "express";
import { container } from "../config/iocContainer";
import { ProductController } from "../../driver/controllers/productController";
import cors from "cors";

const productRoutes = Router();

productRoutes.use(cors({ origin: "*" }));

const productController = container.get(ProductController);

productRoutes.post(
  "/product/create",
  productController.createProduct.bind(productController)
);
productRoutes.put(
  "/product",
  productController.updateProduct.bind(productController)
);
productRoutes.delete(
  "/product/:id",
  productController.removeProduct.bind(productController)
);
productRoutes.get(
  "/product/list-by-category/:categoryId",
  productController.listProductByCategory.bind(productController)
);

export { productRoutes };
