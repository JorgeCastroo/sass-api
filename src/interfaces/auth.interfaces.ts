import { User, UserResponse } from "./user.interfaces";


export interface UserLogin{
    email:string;
    password:string;
}


export interface LoginResponse{
    token:string;
    user:UserResponse;
}


export interface AuthRepository{
login({email,password}:UserLogin):Promise<User | null>;
    
}