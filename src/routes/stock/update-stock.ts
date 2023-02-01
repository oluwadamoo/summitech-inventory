import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { NotFoundError } from "../../errors";
import { currentUser, requireAuth, validateRequest } from "../../middlewares";
import { Stock } from "../../models";


const router = Router()


router.patch("/api/stocks/:batch_id", currentUser, requireAuth,
    [
        body('quantity').isFloat({ gt: 0 }).withMessage('stock price must be greater than 0'),
    ], validateRequest, async (req: Request, res: Response) => {

        const { quantity } = req.body

        const stock = await Stock.findOne({
            where: {
                batchId: req.params.batch_id
            },

        })

        if (!stock) {
            throw new NotFoundError("Stock not found!")
        }



        stock.set({
            quantity
        })

        await stock.save()


        res.send({ message: "Stock updated!", stock })
    })


export { router as updateStockRouter }