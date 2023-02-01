import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { User } from "../../models";
import { Password } from "../../services";


const router = Router()


router.post("/api/users/signup",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('name').trim().isLength({ min: 2 }).withMessage('name is a required field'),
        body('password').trim().isStrongPassword().withMessage('password must contain atleast 8 character, an uppercase letter, a number, and a symbol')
    ], validateRequest, async (req: Request, res: Response) => {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({
            where: {
                email
            }
        })

        if (existingUser) {
            throw new BadRequestError('Email already in use');
        }


        const hashedPassword = await Password.toHash(password)

        const user = User.build({
            name, email, password: hashedPassword
        })

        await user.save()

        // JWT
        const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.status(201).send({ message: "User created!", user })
    })


export { router as signupRouter }