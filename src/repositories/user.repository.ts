import { prisma } from "../database/prisma-client";
import { UserCreate, UserRepository, UserResponse } from "../interfaces/user.interfaces";

class UserRepositoryPrisma implements UserRepository {
    async create(user: UserCreate): Promise<UserResponse> {
        const result = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                roles:user.roles
            },
        });
        const { password: userPassword, ...userWithoutPassword } = result;

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
    async findAll(): Promise<UserResponse[]> {
        const result = await prisma.user.findMany();
        return result;
    }
    async currentUser(userId: string): Promise<UserResponse> {


        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (result === null) {
            throw new Error('User not found');
        }
        
        const { password: teste, ...userWithoutPassword } = result;

        return userWithoutPassword
    }
}

export { UserRepositoryPrisma };
