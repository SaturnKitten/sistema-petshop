const ContaReceber = require('../models/contaReceber.model');

exports.getAllContasReceber = async (req, res) => {
    try {
        const rows = await ContaReceber.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar contas a receber", error: error.message });
    }
};

exports.getContaReceberById = async (req, res) => {
    try {
        const conta = await ContaReceber.getById(req.params.id);
        if (!conta) return res.status(404).json({ message: "Conta a receber não encontrada" });
        res.status(200).json(conta);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar conta a receber", error: error.message });
    }
};

exports.createContaReceber = async (req, res) => {
    const { Descricao, DataLancamento, Valor, Status, ID_Cliente } = req.body;
    if (!Descricao || !Valor || !ID_Cliente)
        return res.status(400).json({ message: "Descrição, Valor e ID_Cliente são obrigatórios" });

    try {
        const result = await ContaReceber.create({ Descricao, DataLancamento, Valor, Status, ID_Cliente });
        res.status(201).json({ message: "Conta a receber criada com sucesso", id: result.id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar conta a receber", error: error.message });
    }
};

exports.updateContaReceber = async (req, res) => {
    const { Descricao, DataLancamento, Valor, Status } = req.body;
    try {
        const result = await ContaReceber.update({ Descricao, DataLancamento, Valor, Status, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Conta a receber não encontrada" });
        res.status(200).json({ message: "Conta a receber atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar conta a receber", error: error.message });
    }
};

exports.deleteContaReceber = async (req, res) => {
    try {
        const result = await ContaReceber.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Conta a receber não encontrada" });
        res.status(200).json({ message: "Conta a receber removida com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover conta a receber", error: error.message });
    }
};
