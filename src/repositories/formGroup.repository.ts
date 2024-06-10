import { FormGroup } from "@prisma/client";
import { prisma } from "../database/prisma-client";
import { FormGroupCreate, FormGroupDelete, FormGroupUpdate } from "../interfaces/formGroup.interfaces";

class FormGroupRepositoryPrisma {

  async create(form: FormGroupCreate): Promise<FormGroup> {
    const formGroup = await prisma.formGroup.create({
      data: {
        ...form
      }
    });

    return formGroup;
  }

  async findById(id: string): Promise<FormGroup | null> {
    const formGroup = await prisma.formGroup.findFirst({
      where: {
        id: id
      }
    });

    return formGroup || null;
  }
  async findAll(): Promise<FormGroup[]> {
    const formGroups = await prisma.formGroup.findMany();
    return formGroups || [];
  }

  async update(form: FormGroupUpdate): Promise<FormGroup> {
    const existingFormGroup = await prisma.formGroup.findFirst(
      {
        where: {
          id: form.id
        }
      }
    );

    if(!existingFormGroup) {
      throw new Error('Formulario não encontrado');
    }

    const formGroup = await prisma.formGroup.update({
      where: {
        id: form.id
      },
      data: {
        ...form
      }
    });
    
    return formGroup;
}
  async delete(id: string): Promise<FormGroupDelete> {

const existingFormGroup = await prisma.formGroup.findFirst(
      {
        where: {
          id: id
        }
      }
    );

    if(!existingFormGroup) {
      throw new Error('Formulario não encontrado');
    }

    await prisma.formGroup.delete({
      where: {
        id: id
      }
    });
return {id, message:"Formulario deletado com sucesso"};
  }
}
export { FormGroupRepositoryPrisma };

