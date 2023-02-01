import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";


type ProductAttrs = {
    id: number;
    product_name: string;
    product_price: number;
}

type ProductCreationAttrs = Optional<ProductAttrs, 'id'>;

class Product extends Model<ProductAttrs, ProductCreationAttrs>{
    declare id: number;
    declare product_name: string;
    declare product_price: number;
}


Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
    sequelize,
    tableName: 'products'
})

export { Product }