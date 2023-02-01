import { Request, Response, Router } from "express";
import { NotFoundError } from "../../errors";
import { Product, Stock, } from "../../models";


const router = Router()


router.get("/api/products/:product_id",
    async (req: Request, res: Response) => {

        const product = await Product.findOne({
            where: {
                id: req.params.product_id
            },
            include: [
                {
                    model: Stock
                }
            ]
        })

        if (!product) {
            throw new NotFoundError("Product not found!")
        }
        res.send({ message: "Product retrieved!", product })
    })


export { router as getProductByIdRouter }