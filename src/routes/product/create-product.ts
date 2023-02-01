import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../middlewares";
import { Product } from "../../models";


const router = Router()


router.post("/api/products", currentUser, requireAuth,
    [
        body('product_name').trim().isLength({ min: 2 }).withMessage('product name is a required field'),
        body('product_price').isFloat({ gt: 0 }).withMessage('product price must be greater than 0')
    ], validateRequest, async (req: Request, res: Response) => {

        const { product_name, product_price } = req.body




        const product = Product.build({
            product_name, product_price
        })

        await product.save()


        res.status(201).send({ message: "Product created!", product })
    })


export { router as createProductRouter }