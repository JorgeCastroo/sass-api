import { FastifyInstance } from "fastify";
import { FormGroupCreate } from "../interfaces/formGroup.interfaces";
import { FormGroupUseCase } from "../usecases/formGroup.usecase";



export async function formGroupRoutes(fastify: FastifyInstance) {
    const formGroupUseCase = new FormGroupUseCase();

    fastify.post<{ Body: FormGroupCreate }>('/create', async (request, reply) => {
        try {
            const data = await formGroupUseCase.create(request.body);
            reply.send({
                formGroup: data,
                message: "Formulario criado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get('/findAll', async (request, reply) => {
        try {
            const data = await formGroupUseCase.findAll();
            reply.send({
                formGroup: data,
                message: "Formularios encontrados com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get<{ Params: { id: string } }>('/findById/:id', async (request, reply) => {
        try {
            const data = await formGroupUseCase.findById(request.params.id);
            reply.send({
                formGroup: data,
                message: "Formulario encontrado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )

    fastify.put<{ Body: FormGroupCreate,Params: { id: string } }>('/update/:id', async (request, reply) => {
        try {
            const data = await formGroupUseCase.update({ ...request.body, id: request.params.id});
            reply.send({
                formGroup: data,
                message: "Formulario atualizado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.delete<{ Params: { id: string } }>('/delete/:id', async (request, reply) => {
        try {
            const data = await formGroupUseCase.delete(request.params.id);
            reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )
}


