import fastify, { FastifyInstance } from 'fastify';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { validateToken } from './utils/validateToken';

const app: FastifyInstance = fastify({ logger: true });

app.register(authRoutes, {
    prefix: '/auth'
})
app.get('/', async (request, reply) => {
    return {
        message: 'Hello World',
    }
}
)

app.register(async function (fastify) {
    fastify.addHook('preHandler', validateToken);
    fastify.register(userRoutes, { prefix: '/users' });
   
});
app.listen({
    host: '0.0.0.0',
    port: 4000,
},
    () => console.log('Server is running on port 3000'),
)