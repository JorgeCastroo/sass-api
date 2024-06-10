import { FastifyInstance } from "fastify";
import { FormBody, FormUpdateBody } from "../interfaces/form.interfaces";
import { FormUseCase } from "../usecases/form.usecase";



export async function formRoutes(fastify: FastifyInstance) {
    const formUseCase = new FormUseCase();

    fastify.post<{ Body: FormBody, Params: { id: string } }>('/:id/create', async (request, reply) => {
        try {
            const data = await formUseCase.create({ ...request.body, formGroupId: request.params.id });
            reply.send({
                form: data,
                message: "Formulario criado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

fastify.get<{ Params: { id: string } }>('/findAll/:id', async (request, reply) => {
        try {
            const data = await formUseCase.findAll(request.params.id);
            reply.send({
                forms:data,
                message: "Formularios encontrados com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.get<{ Params: { id: string } }>('/findById/:id', async (request, reply) => {
        try {
            const data = await formUseCase.findById(request.params.id);
            reply.send({
                form:data,
                message: "Formulario encontrado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.put<{ Body: FormUpdateBody, Params: { id: string } }>('/update/:id', async (request, reply) => {
        try {
            const data = await formUseCase.update({...request.body,id:request.params.id});
            reply.send({
                form: data,
                message: "Formulario atualizado com sucesso"
            })
        } catch (error) {
            reply.code(500).send(error)
        }
    })

    fastify.delete<{ Params: { id: string } }>('/delete/:id', async (request, reply) => {
        try {
            const data = await formUseCase.delete(request.params.id);
            reply.send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
    )


}


