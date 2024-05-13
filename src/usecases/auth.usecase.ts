import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository, LoginResponse, UserLogin } from "../interfaces/auth.interfaces";
import { AuthRepositoryPrisma } from "../repositories/auth.repository";

export class AuthUseCase {
    private authRepository: AuthRepository;
    constructor() {
        this.authRepository = new AuthRepositoryPrisma();
    }
    async login({ email, password }: UserLogin): Promise<LoginResponse> {
        const user = await this.authRepository.login({ email, password });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('Email or password incorrect');
        }
    
        const token = jwt.sign({ userId: user.id }, 'api-sass', { expiresIn: '7d' });
    
        const { password:userPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}