import { Request, Response, Router } from "express";
import { Stock, } from "../../models";


const router = Router()


router.get("/api/stocks",
    async (req: Request, res: Response) => {

        const stocks = await Stock.findAll({})

        res.send({ message: "Stocks retrieved!", stocks })
    })


export { router as getAllStocksRouter }