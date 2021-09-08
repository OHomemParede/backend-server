const database = require("../database");
const UsuarioModel = require("./usuario");
const RegistroModel = require("./registro");
const VacinaModel = require("./vacina");


// um usuario possui varios registros
UsuarioModel.hasMany(RegistroModel, {
    foreignKey: {
        name: "idusuario",
        allowNull: false,
    },
    sourceKey: "idusuario",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
});

// uma vacina somente tem um registro
VacinaModel.hasOne(RegistroModel, {
    foreignKey: {
        name: "idvacina",
        allowNull: false,
    },
    sourceKey: "idvacina",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
});


//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
    UsuarioModel,
    RegistroModel,
    VacinaModel,
};