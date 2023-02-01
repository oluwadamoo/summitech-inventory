import { Request, Response, Router } from "express";
import { Product, Stock, } from "../../models";


const router = Router()


router.get("/api/products",
    async (req: Request, res: Response) => {

        const products = await Product.findAll({
            include: [
                {
                    model: Stock
                }
            ]
        })
        res.send({ message: "Products retrieved!", products })
    })


export { router as getAllProductsRouter }