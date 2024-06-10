

export interface Field{
  label: string;
  type: string;
  required: boolean;
  options: string[];
}

export interface FormCreate {
  formGroupId: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fields: Field[];
}

export interface FormUpdate {
  id: string;
  formGroupId: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fields: Field[];

}

export interface FormUpdateBody{
  formGroupId: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fields: Field[];
}

export interface FormBody{
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fields: Field[];
}

export interface Form{
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fields: Field[];
  created_at: Date;
  updated_at: Date;
}
export interface FormDelete{
  id:string;
  message:string;
}



export interface FormRepository {
  create(form: FormCreate): Promise<Form>;
  findAll(id:string): Promise<Form[]  | null>;
  findById(id: string): Promise<Form | null>;
  update(form: FormUpdate): Promise<Form>;
  delete(id: string): Promise<FormDelete>;
}