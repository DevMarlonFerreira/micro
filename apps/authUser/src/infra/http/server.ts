import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import * as database from "./database";
// import { Jobs } from "./jobs/index";
import logger from '../../util/logger';
import { IAuthRouter } from "../routes/auth";


export class SetupServer {
  private app: Application;
  // private jobs: Jobs;

  constructor(private port: string | number) {
    this.app = express();
    // this.jobs = new Jobs();
  }

  public async init(routes: IAuthRouter[]) {
    this.setupExpress();
    this.setupRoutes(routes);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(helmet());
    this.app.use(compression());
  }

  private setupRoutes(routes): void {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      logger.info('Server rodando na porta: ' + this.port);
    });

    await this.databaseSetup();
    // await this.jobs.createFirstUser();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
