import { prisma } from "../database/prisma-client";
import { UserCreate, UserRepository, UserResponse } from "../interfaces/user.interfaces";

class UserRepositoryPrisma implements UserRepository {
    async create(user: UserCreate): Promise<UserResponse> {
        const result = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            },
        });
    const { password:userPassword, ...userWithoutPassword } = result;

        return userWithoutPassword
    }

    async findByEmail(email: string): Promise<UserResponse | null> {
        const result = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        return result || null;
    }
}

export { UserRepositoryPrisma };
