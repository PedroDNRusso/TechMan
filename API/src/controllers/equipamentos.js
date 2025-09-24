const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const equipamentos = await prisma.equipamento.findMany();
        res.json(equipamentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }
}

const create = async (req, res) => {
    const { equipamento, imagem, descricao } = req.body;
    if (!equipamento || !imagem || !descricao) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    try {
        const novoEquipamento = await prisma.equipamento.create({
            data: { equipamento, imagem, descricao }
        });
        res.status(201).json(novoEquipamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar equipamento' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const equipamento = await prisma.equipamento.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(equipamento);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar equipamento' });
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.equipamento.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar equipamento' });
    }
}

module.exports = {
    read,
    create,
    update,
    del

};