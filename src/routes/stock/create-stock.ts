import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadRequestError, NotFoundError } from "../../errors";
import { currentUser, requireAuth, validateRequest } from "../../middlewares";
import { Product, Stock } from "../../models";


const router = Router()


router.post("/api/stocks", currentUser, requireAuth,
    [
        body('batch_id').trim().isLength({ min: 2 }).withMessage('batch Id is a required field'),
        body('quantity').isFloat({ gt: 0 }).withMessage('quantity must be greater than 0'),
        body('product_id').notEmpty().trim().withMessage('product id is required')
    ], validateRequest, async (req: Request, res: Response) => {

        const { batch_id, quantity, product_id } = req.body


        const product = await Product.findOne({
            where: {
                id: product_id
            }
        })

        if (!product) {
            throw new NotFoundError("Product not found!")
        }
        const existingStock = await Stock.findOne({
            where: {
                batchId: batch_id
            }
        })

        if (existingStock) {
            throw new BadRequestError("Batch Id must be unique")
        }


        const stock = Stock.build({
            batchId: batch_id, quantity, product_id
        })

        await stock.save()


        res.status(201).send({ message: "Stock added!", stock })
    })


export { router as createStockRouter }