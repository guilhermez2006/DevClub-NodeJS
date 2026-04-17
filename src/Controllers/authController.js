import pkg from "@prisma/client"
const { PrismaClient } = pkg
const prisma = new PrismaClient()
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Busca usuário pelo email, retorna 404 se não encontrar
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

        // Compara senha digitada com o hash salvo no banco
        const senhaCorreta = await bcrypt.compare(password, user.password)
        if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta" })

        // Gera token JWT assinado com a chave secreta do .env, expira em 1 dia
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}