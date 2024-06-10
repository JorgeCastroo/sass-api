import bcrypt from 'bcrypt';
import { FastifyInstance } from "fastify";
import jwt from 'jsonwebtoken';
import { TokenJwt } from '../interfaces/auth.interfaces';
import { UserCreate } from "../interfaces/user.interfaces";
import { UserUseCase } from "../usecases/user.usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUserCase = new UserUseCase();
    fastify.post<{ Body: UserCreate }>('/create', async (request, reply) => {
        try {

            const { name, email,password,roles } = request.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await userUserCase.create({
                name,
                email,
                password: hashedPassword,
                roles
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

    fastify.get('/currentUser', async (request, reply) => {
        try {
            const token = request.headers.authorization;
           if(!token){
               reply.code(401).send({message:'Unauthorized'});
               return;
              }
            const tokenWithoutBearer = token?.replace('Bearer ','');
            const jwtReq  = jwt.decode(tokenWithoutBearer,{}) as TokenJwt
            const data = await userUserCase.currentUser(jwtReq.userId);
            reply.send(data)
        } catch (error) {
            reply.code(500).send
        }})
}