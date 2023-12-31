import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

interface AuthUser {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthUser) {

        const user = await prismaClient.user.findFirst({ where: { email: email } })

        console.log(user);

        if (!user) {
            throw new Error("User incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        console.log(passwordMatch);

        if (!passwordMatch) {
            throw new Error("Password incorrect")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService };