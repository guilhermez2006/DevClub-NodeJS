import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
import bcrypt from "bcryptjs"; // Importa o bcrypt aqui também!

export const adicionarJogo = async (req, res) => {
    try {
        const { email, name, age, password } = req.body;

        // 1. Criptografa a senha (10)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // 2. Salva no banco o HASH, não a senha limpa
        const newUser = await prisma.user.create({ 
            data: { 
                email, 
                name, 
                password: hashPassword // Aqui vai a senha protegida!
            } 
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarJogos = async (req, res) => {
    try {
        // findMany busca todos os registros sem filtro, retorna um array
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const buscarJogoId = async (req, res) => {
    try {
        const users = await prisma.user.findUnique({
            where: { id: req.params.id }
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Pendente verificar melhor a questão de Atualizar status do jogo também
export const editarJogo = async (req, res) => {
    try {
        const users = await prisma.user.update({
            where: { id: req.params.id }, // qual registro alterar (id vem pela URL)
            data: req.body, // o que alterar (dados vêm pelo body JSON)
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletarJogo = async (req, res) => {
    try {
        const users = await prisma.user.delete({
            where: { id: req.params.id }, // qual registro deletar (id vem pela URL)
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};