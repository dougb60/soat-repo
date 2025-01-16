import "reflect-metadata";
import { container } from "./adapter/infra/config/iocContainer";
import { ExpressServer } from "./adapter/infra/server/expressServer";
import { AppDataSource } from "./adapter/infra/typeORM/config";

async function main() {
  try {
    console.log("Initializing IoC container...");
    container;

    await AppDataSource.initialize();
    console.log("Data base running...");
    await AppDataSource.runMigrations();
    console.log("Migrations finished...");

    const server = new ExpressServer();
    server.registerRoutes();

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    await server.start(port);
  } catch (error) {
    console.error("Error during application initialization:", error);
    process.exit(1);
  }
}

main();
