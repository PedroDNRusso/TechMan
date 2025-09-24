const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os usuários
const read = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Criar usuário
const create = async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Login
const login = async (req, res) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({ message: "A senha é obrigatória" });
    }

    try {
        const usuario = await prisma.usuario.findFirst({
            where: { senha: parseInt(senha) },
            select: {
                id: true,
                senha: true,
                perfilId: true
            }
        });

        if (!usuario) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        res.status(200).json({
            id: usuario.id,
            senha: usuario.senha,
            perfilId: usuario.perfilId,
            message: "Login bem-sucedido"
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};

module.exports = {
    read,
    create,
    login
};
