import { Request, Response } from "express";
import { Auth } from "../../domain/auth";
import { MessagingAdapter } from "../adapters/messaging-adapter";
import { AuthRepository } from "../repositories/auth-repository";

interface AuthRequest {
    username: string;
    password: string;
}

export class AuthUser {
    constructor(
        private authRepository: AuthRepository,
        private messagingAdapter: MessagingAdapter,
    ) { }

    // async execute({ username, password }: AuthRequest): Promise<void> {
    async execute(req: Request, res: Response): Promise<Response> {
        const authRequest: AuthRequest = req.body;

        const user = await this.authRepository.findByUserName(authRequest.username);

        const userExists = !!user;

        if (!userExists) {
            throw new Error('User does not exists');
        }

        const customer = new Auth({
            username: authRequest.username,
            password: authRequest.password,
        })

        await this.messagingAdapter.sendMessage('auth.authorized', {
            auth: {
                id: 1
            },
        })

        return res.status(201).send();
    }
}