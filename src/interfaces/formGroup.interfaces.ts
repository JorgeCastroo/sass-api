export interface FormGroup {
    id: string;
    title: string;
    description: string | null;
    color: string;
    icon: string;
    created_at: Date;
    updated_at: Date;
  }



  export interface FormGroupCreate {
    title: string;
    description: string;
    color: string;
    icon: string;
    }


    export interface FormGroupUpdate {
        id: string;
        title: string;
        description: string;
        color: string;
        icon: string;
      }


      export interface FormGroupDelete{
          id:string;
          message:string;
      }
  


export interface FormGroupRepository{
    create(form:FormGroupCreate):Promise<FormGroup>;
    findById(id:string):Promise<FormGroup | null>;
    findAll():Promise<FormGroup[]>;
    update(form:FormGroupCreate):Promise<FormGroup>;
    delete(id:string):Promise<FormGroupDelete>;
}