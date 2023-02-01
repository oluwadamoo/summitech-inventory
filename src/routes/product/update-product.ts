import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { NotFoundError } from "../../errors";
import { currentUser, requireAuth, validateRequest } from "../../middlewares";
import { Product } from "../../models";


const router = Router()


router.patch("/api/products/:product_id", currentUser, requireAuth,
    [
        body('product_name').trim().isLength({ min: 2 }).withMessage('product name is a required field'),
        body('product_price').isFloat({ gt: 0 }).withMessage('product price must be greater than 0')
    ], validateRequest, async (req: Request, res: Response) => {

        const { product_name, product_price } = req.body

        const product = await Product.findOne({
            where: {
                id: req.params.product_id
            },

        })

        if (!product) {
            throw new NotFoundError("Product not found!")
        }



        product.set({
            product_name, product_price
        })

        await product.save()


        res.send({ message: "Product updated!", product })
    })


export { router as updateProductRouter }