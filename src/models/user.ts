import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

type UserAttrs = {
    id: number;
    name: string;
    email: string;
    password?: string;
}

type UserCreationAttrs = Optional<UserAttrs, 'id'>;

class User extends Model<UserAttrs, UserCreationAttrs>{

    declare id: number;
    declare email: string;
    declare password: string;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false

        },


    }, {
    sequelize,

    tableName: 'users'
})

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
}
export { User }