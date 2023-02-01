import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { Product } from "./product";


type StockAttrs = {
    id: number;
    batchId: string;
    quantity: number;
    product_id: number;
}

type StockCreationAttrs = Optional<StockAttrs, 'id'>;

class Stock extends Model<StockAttrs, StockCreationAttrs>{
    declare id: number;
    declare batchId: string;
    declare quantity: number;
    declare product_id: number;
}


Stock.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        batchId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        }
    }, {
    sequelize,
    tableName: 'stocks'
})



Product.hasMany(Stock, { foreignKey: 'id' })

export { Stock }