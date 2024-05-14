import bcrypt from 'bcrypt';
import { FastifyInstance } from "fastify";
import { UserCreate } from "../interfaces/user.interfaces";
import { UserUseCase } from "../usecases/user.usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUserCase = new UserUseCase();
    fastify.post<{ Body: UserCreate }>('/create', async (request, reply) => {
        try {

            const { name, email,password } = request.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await userUserCase.create({
                name,
                email,
                password: hashedPassword
            });
            reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )

    fastify.get('/findAll', async (request, reply) => {
        try {
            const data = await userUserCase.findAll();
            reply.send(data)
        } catch (error) {
            reply.code(500).send
        }})
}