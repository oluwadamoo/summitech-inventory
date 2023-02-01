import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes/auth';
import { createProductRouter, getAllProductsRouter, getProductByIdRouter, updateProductRouter } from './routes/product';
import { createStockRouter, getAllStocksRouter, getStockByBatchIdRouter, updateStockRouter } from './routes/stock';


const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(cookieSession({
    signed: false,
    secure: false,

}));

app.use([
    // AUTH
    currentUserRouter,
    signinRouter,
    signoutRouter,
    signupRouter,

    // PRODUCTS
    createProductRouter,
    getAllProductsRouter,
    getProductByIdRouter,
    updateProductRouter,


    // STOCKS
    createStockRouter,
    getAllStocksRouter,
    getStockByBatchIdRouter,
    updateStockRouter

])
app.get("/", (req, res) => {

    res.send({ message: "Invent the Inventories!!" })
})

app.all('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app }