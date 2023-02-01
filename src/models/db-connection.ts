import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config()

if (!process.env.DB_NAME) {
    throw new Error('DB_NAME must be defined')
}
if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined')
}
if (!process.env.DB_USER) {
    throw new Error('DB_USER must be defined')
}
if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be defined')
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

export { sequelize }