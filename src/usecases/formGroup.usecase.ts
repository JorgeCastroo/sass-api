import { z } from "zod";
import { FormGroup, FormGroupCreate, FormGroupDelete, FormGroupRepository, FormGroupUpdate } from "../interfaces/formGroup.interfaces";
import { FormGroupRepositoryPrisma } from "../repositories/formGroup.repository";


export class FormGroupUseCase {
    private formGroupRepository: FormGroupRepository;
    constructor() {
        this.formGroupRepository = new FormGroupRepositoryPrisma();
    }

    async create(body:FormGroupCreate):Promise<FormGroup>{
        const schemaCreate = z.object({
            title: z.string({message:"Titulo é obrigatorio"}).min(1,"Titulo é obrigatorio"),
            description: z.string().optional(),
            color: z.string({message:"Cor é obrigatorio"}).min(1,"Cor é obrigatorio"),
            icon: z.string({message:"Icone é obrigatorio"}).min(1,"Icone é obrigatorio"),
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

        const formGroup = await this.formGroupRepository.create({
            ...body,
            description: body.description || "",
        });
        return formGroup;
    }

    async findById(id:string):Promise<FormGroup|null>{
        const formGroup = await this.formGroupRepository.findById(id);

        if(!formGroup){
            throw new Error('Secao de formularios não encontrada');
        }
        return formGroup;
    }

    async findAll():Promise<FormGroup[]>{
        const formGroups = await this.formGroupRepository.findAll();
        return formGroups;
    }

    async update(body:FormGroupUpdate):Promise<FormGroup>{
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

        const formGroup = await this.formGroupRepository.update({
            ...body,
        });
        return formGroup;
    }

    async delete(id:string):Promise<FormGroupDelete>{
        const formGroup = await this.formGroupRepository.delete(id);

        if(!formGroup){
            throw new Error('Secao de formularios não encontrada');
        }
        return formGroup;
    }

}