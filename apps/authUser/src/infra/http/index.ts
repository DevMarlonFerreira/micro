import 'dotenv/config';
import logger from "../../util/logger";
import { SetupServer } from "./server";
import { AuthRouter } from "../routes/auth";

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`App encerrado com unhandled promise: ${promise} and reason: ${reason}`);
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`App encerrado com uncaught exception: ${error}`);
  process.exit(1);
});

process.on('SIGTERM', (error) => {
  logger.error(`App encerrado com SIGTERM: ${error}`);
  process.exit(1);
});

(async (): Promise<void> => {
  try {
    const server = new SetupServer(process.env.PORT || 3333);
    await server.init(routes());
    await server.start();
  } catch (error) {
    logger.error(`App encerrado com erro: ${error}`);
    process.exit(1);
  }
})();

function routes() {
  const routes = [
    new AuthRouter(),
  ];
  return routes;
}