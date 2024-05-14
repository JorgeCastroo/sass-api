export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
    created_at:Date;
    updated_at:Date;
}

export interface UserResponse{
    id:string;
    name:string;
    email:string;
    created_at:Date;
    updated_at:Date;

}

export interface UserCreate{
    name:string;
    email:string;
    password:string;
}
export interface UserRepository{
    create(user:UserCreate):Promise<UserResponse>;
    findByEmail(email:string):Promise<UserResponse | null>;
    findAll():Promise<UserResponse[]>;
    
}