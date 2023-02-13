import { Auth } from "../../domain/auth";

export interface AuthRepository {
  findByUserName(auth: string): Promise<Auth | null>;
}