import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { User } from "../../models";
import { Password } from "../../services";


const router = Router()

router.post("/api/users/signin",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isStrongPassword().withMessage('password must contain atleast 8 character, an uppercase letter, a number, and a symbol')
    ], validateRequest, async (req: Request, res: Response) => {

        const { email, password } = req.body

        const existingUser = await User.findOne({
            where: {
                email
            }
        })

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }


        const passwordsMatch = await Password.compare(existingUser.password!, password)

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid Credentials")
        }


        // JWT
        const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.send({ message: "User signed In!", user: existingUser })
    })


export { router as signinRouter }