import { UserCreate, UserRepository, UserResponse } from "../interfaces/user.interfaces";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class UserUseCase{
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepositoryPrisma();
    }
    async create({name,email,password}:UserCreate):Promise<UserResponse>{
const verifyUserExists = await this.userRepository.findByEmail(email);
if(verifyUserExists){
    throw new Error('Email already exists');
}
const result = await this.userRepository.create({name,email,password});   

return result;
    }
}