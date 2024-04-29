import { prisma } from '../../prisma/client';
import { compare } from "bcrypt";
import { hash } from "bcrypt";
import { TypeErrorsEnum } from 'enum/TypeErrorsEnum';
import { user } from '@prisma/client'

export class UserService {

    async findToLogin(email: string, password: string) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                },
            })
            if(user && await compare(password, user.password))
                return  { ok: true, message: "Login Succesfully!", data: user };
            return { ok: false, message: "Login Failed!", data: TypeErrorsEnum.NotFound};          
        } catch (error) {
            console.log(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async create(user: user) {
        try {
            user.password = await hash(user.password, 8);
            const createdUser = await prisma.user.create({ data: user })
            return { ok: true, message: "Created successfully!", data: createdUser };
        } catch (error: any) {
            console.log(error)
            //if (error.meta.target.includes("email"))
              //  return { ok: false, message: "Email já existe", data: TypeErrorsEnum.AlreadyExists };
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

}