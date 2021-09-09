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
RegistroModel.belongsTo(UsuarioModel, {
    foreignKey: "idusuario",
    targetKey: "idusuario",
});



// uma vacina somente tem um registro
VacinaModel.hasMany(RegistroModel, {
    foreignKey: {
        name: "idvacina",
        allowNull: false,
    },
    sourceKey: "idvacina",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true,
});
RegistroModel.belongsTo(VacinaModel, {
    foreignKey: "idvacina",
    targetKey: "idvacina",
})


//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
    UsuarioModel,
    RegistroModel,
    VacinaModel,
};
