import { prisma } from "../database/prisma-client";
import { Field, Form, FormCreate, FormDelete, FormUpdate } from "../interfaces/form.interfaces";

class FormRepositoryPrisma {

  async create(form: FormCreate): Promise<Form> {

    const convertFields = JSON.stringify(form.fields);
 
    const formResponse = await prisma.form.create({
      data: {
        ...form,
        fields: convertFields, 
      }
    });

    const formFields = JSON.parse(formResponse.fields) as Field[];

    return {...formResponse,fields: formFields};
  }


  async findById(id: string): Promise<Form | null> {
    const formResponse = await prisma.form.findUnique({
      where: {
        id
      }
    });

    if(!formResponse){
      return null;
    }

    const formFields = JSON.parse(formResponse.fields) as Field[];

    return {...formResponse,fields: formFields};
  }

  async update( form: FormUpdate): Promise<Form> {
    const existingForm = await prisma.form.findUnique({
      where: {
        id: form.id,
      },
    });
  
    if (!existingForm) {
      throw new Error(`Form with id ${form.id} not found`);
    }

    const convertFields = JSON.stringify(form.fields);
    const formResponse = await prisma.form.update({
      where: {
        id:form.id
      },
      data: {
        ...form,
        fields: convertFields
      }
    });

    const formFields = JSON.parse(formResponse.fields) as Field[];

    return {...formResponse,fields: formFields};
  }

  async delete(id: string): Promise<FormDelete> {
const existingForm = await prisma.form.findUnique({
      where: {
        id
      }
    });

    if(!existingForm){
      throw new Error('Formulario não encontrado');
    }

    const formResponse = await prisma.form.delete({
      where: {
        id
      }
    });


    return {id:formResponse.id,message:"Formulario deletado com sucesso"};
  }

  async findAll(id:string): Promise<Form[] | null> {
    const formsResponse = await prisma.form.findMany({
      where: {
        formGroupId:id
      }
    });

    const forms = formsResponse.map(form => {
      const formFields = JSON.parse(form.fields) as Field[];
      return {...form,fields: formFields};
    });

    return forms;
  }

}

export { FormRepositoryPrisma };

