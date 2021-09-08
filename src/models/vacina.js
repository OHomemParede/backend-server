const Sequelize = require("sequelize");
const database = require("../database");

const Vacina = database.define(
    "vacina",
    {
        idvacina: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },

    {
        freezeTableName: true
    }
);
module.exports = Vacina;