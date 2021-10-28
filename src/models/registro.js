const Sequelize = require("sequelize");
const database = require("../database");


const Registro = database.define(
    "registro",
    {
        idregistro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            
        },
        data: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    },
    {
        freezeTableName: true
    }
);



module.exports = Registro;