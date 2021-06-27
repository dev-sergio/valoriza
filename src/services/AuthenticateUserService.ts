import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute ( {email, password }: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incerreto");
    }
    
    const passwordMatch = await compare(password, user.password);
    
    if(!passwordMatch){
      throw new Error("Email/Password incerreto");
    }

    const token = sign({
      email: user.email
    }, "2c11f6c9572711d8138ae182e6be276b", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;

  }
}

export { AuthenticateUserService }