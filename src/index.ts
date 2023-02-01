import { config } from "dotenv";

import { app } from "./app";
import { DatabaseConnectionError } from "./errors";
import { sequelize } from "./models";

config()

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }

    if (process.env.NODE_ENV == 'development' && !process.env.PORT) {
        throw new Error('PORT must be defined')

    }

    try {
        await sequelize.sync()

        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        throw new DatabaseConnectionError()
    }


    app.listen(process.env.PORT, () => {
        console.log('Listening on port:', process.env.PORT)
    })
}

start()