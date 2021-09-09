const Sequelize = require("sequelize");
require("dotenv").config();

try {
    database = new Sequelize(process.env.DB_URL, { logging: false });

    database
        .authenticate()
        .then(() => {
            console.log("Conexão realizada com o SGBD");
        })
        .catch((error) => {
            console.error(
                "Não foi possível conectar com o SGBD\n",
                error.message
            );
        });
} catch (err) {
    console.log(err.message);
}

module.exports = database;
