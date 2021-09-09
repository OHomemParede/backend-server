const { VacinaModel } = require("../models");

class VacinaController {
    // ============================= CREATE =============================
    async create(req, res) {
        const { nome } = req.body;

        return await VacinaModel.create({ nome })
            .then(async (r) => {
                const { idvacina, nome } = r.get();
                return res.status(200).json({ idvacina, nome });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= UPDATE NOME =============================
    async updatenome(req, res) {
        const { idvacina, nome } = req.body;
        return await VacinaModel.findOne({
            where: { idvacina },
        })
            .then(async (vacina) => {
                if (vacina) {
                    await vacina.update({ nome });
                    return res.status(200).json({
                        idvacina,
                        nome,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Vacina não identificada" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Delete Vacina =============================
    async deletevacina(req, res) {
        const { idvacina } = req.body;
        return await VacinaModel.destroy({
            where: { idvacina },
        })
            .then(async () => {
                res.status(200).json({ idvacina });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Lista Vacinas =============================
    async listavacinas(req, res) {
        return await VacinaModel.findAndCountAll({
            attributes: ["idvacina", "nome"],
            order: [["nome", "ASC"]],
        }).then((result) => {
            res.status(200).json({
                Vacinas: result.rows,
                count: result.count,
            });
        });
    }
}

module.exports = VacinaController;
