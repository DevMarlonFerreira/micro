import { Router } from "express";
import { AuthUser } from "../../application/usecases/auth";

import { PrismaAuthRepository } from '../database/prisma/repositories/prisma-auth-repository';
import { KafkaMessagingAdapter } from '../messaging/kafka/adapters/kafka-messaging-adapter';

export interface IAuthRouter {
    setupRoutes: () => void;
}

export class AuthRouter implements IAuthRouter {
    public router = Router();
    public path = "/auth";
    private authUser: AuthUser;

    constructor() {
        const prismaCustomersRepository = new PrismaAuthRepository();
        const prismaAuthRepository = new KafkaMessagingAdapter();

        this.authUser = new AuthUser(prismaCustomersRepository, prismaAuthRepository);
        this.setupRoutes();
    }

    public setupRoutes() {
        this.router.get(`${this.path}/auth`, this.authUser.execute);
    }
}

