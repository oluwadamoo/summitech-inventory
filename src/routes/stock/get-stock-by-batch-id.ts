import { Request, Response, Router } from "express";
import { NotFoundError } from "../../errors";
import { Stock, } from "../../models";


const router = Router()


router.get("/api/stocks/:batch_id",
    async (req: Request, res: Response) => {

        const stock = await Stock.findOne({
            where: {
                batchId: req.params.batch_id
            },

        })

        if (!stock) {
            throw new NotFoundError("Stock not found!")
        }
        res.send({ message: "Stock retrieved!", stock })
    })


export { router as getStockByBatchIdRouter }