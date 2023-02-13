import { AuthRepository } from "../../../../application/repositories/auth-repository";
import { Auth } from "../../../../domain/auth";
import { prisma } from "../prisma";

export class PrismaAuthRepository implements AuthRepository {
    async findByUserName(id: string): Promise<Auth | null> {
        const auth = await prisma.auth.findUnique({
            where: { id: id },
        })

        if (!auth) {
            return null;
        }

        return new Auth({
            // id: auth._id,
            username: auth.username,
            password: auth.password
        });
    }
}