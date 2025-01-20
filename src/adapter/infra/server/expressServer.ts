import express, { Express } from "express";
import { HTTPServer } from "../../../core/applications/ports/HTTPServer";
import { userRoutes } from "../routes/userRoutes";
import { productRoutes } from "../routes/productRoutes";
import { orderRoutes } from "../routes/orderRoutes";
import { swaggerRouter } from "../middlewares/swaggerMiddleware";

export class ExpressServer implements HTTPServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  registerRoutes(): void {
    this.app.use("/soat-api", userRoutes);
    this.app.use("/soat-api", productRoutes);
    this.app.use("/soat-api", orderRoutes);

    this.app.use(swaggerRouter);
  }

  async start(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
          console.log(
            `Swagger docs available at http://localhost:${port}/api-docs`
          );
          resolve();
        })
        .on("error", reject);
    });
  }
}
