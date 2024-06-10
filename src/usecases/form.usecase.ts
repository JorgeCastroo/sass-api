import { z } from "zod";
import { Form, FormCreate, FormDelete, FormRepository, FormUpdate } from "../interfaces/form.interfaces";
import { FormRepositoryPrisma } from "../repositories/form.repository";


export class FormUseCase {
    private formRepository: FormRepository;
    constructor() {
        this.formRepository = new FormRepositoryPrisma();
    }

    async create(body:FormCreate):Promise<Form>{
        const schemaCreate = z.object({
            title: z.string({message:"Titulo é obrigatorio"}).min(1,"Titulo é obrigatorio"),
            description: z.string().optional(),
            color: z.string({message:"Cor é obrigatorio"}).min(1,"Cor é obrigatorio"),
            icon: z.string({message:"Icone é obrigatorio"}).min(1,"Icone é obrigatorio"),
            fields: z.array(z.object({
                title: z.string({message:"Titulo é obrigatorio"}).min(1,"Titulo da pergunta é obrigatorio"),
                description: z.string().optional(),
                type: z.string({message:"Tipo é obrigatorio"}).min(1,"Tipo da pergunta é obrigatorio"),
                required: z.boolean({message:"É obrigatorio informar se é obrigatorio ou não"}),
                options: z.array(z.string()).optional(),
            }),{message:"É necessario ter pelo menos uma pergunta"}).min(1 ,"É necessario ter pelo menos uma pergunta")
        });
        try {
            await schemaCreate.parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(e => `${e.message}`).join(', ');
                throw new Error(errorMessages);
            }
            throw error;
        }

        const form = await this.formRepository.create({
            ...body,
        });
        return form;
    }


    async findById(id:string):Promise<Form | null>{
        const form = await this.formRepository.findById(id);
        if(!form){
             throw new Error('Formulario não encontrado');
        }
        return form;
    }

    async findAll(id:string):Promise<Form[]  | null>{
        const forms = await this.formRepository.findAll(id);
        return forms;
    }

    async update(body:FormUpdate):Promise<Form>{
        const schemaUpdate = z.object({
            id: z.string({message:"Id é obrigatorio"}),
            title: z.string({message:"Titulo é obrigatorio"}).min(1,"Titulo é obrigatorio"),
            description: z.string().optional(),
            color: z.string({message:"Cor é obrigatorio"}).min(1,"Cor é obrigatorio"),
            icon: z.string({message:"Icone é obrigatorio"}).min(1,"Icone é obrigatorio"),
        });
        try {
            await schemaUpdate.parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(e => `${e.message}`).join(', ');
                throw new Error(errorMessages);
            }
            throw error;
        }

        const form = await this.formRepository.update({
            ...body,
        });
        return form;
    }

    async delete(id:string):Promise<FormDelete>{
        const form = await this.formRepository.delete(id);

        if(!form){
            throw new Error('Secao de formularios não encontrada');
        }
        return form;
    }


}