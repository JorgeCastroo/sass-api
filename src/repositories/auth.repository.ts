import { prisma } from "../database/prisma-client";
import { UserLogin } from "../interfaces/auth.interfaces";
import { User } from '../interfaces/user.interfaces';

class AuthRepositoryPrisma {
  async login({
    email,
  }:UserLogin):Promise<User | null> {

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
  
    return user || null;
    
    }

  async loginAdmin({
    email,
  }:UserLogin):Promise<User | null> {

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    return user || null;
    }
}
export { AuthRepositoryPrisma };
