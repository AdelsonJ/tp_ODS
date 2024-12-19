const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');  // Importando o PrismaClient
const prisma = new PrismaClient();  // Criando a instância do Prisma

const app = express();
const port = 5001;

// Configura o middleware CORS
app.use(cors());
app.use(express.json());

// Endpoint para salvar local no banco de dados
app.post('/saveLocal', async (req, res) => {
    console.log("Requisição POST recebida!");

    const { nome, endereco, capacity, description } = req.body;

    try {
        const local = await prisma.local.create({
            data: {
                name: nome,
                address: endereco,
                capacity: Number(capacity),  // Garantir que é número
                description: description,
            },
        });

        console.log("Local salvo com sucesso!");
        res.json({ message: 'Dados do local salvos com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar no banco:', error);
        res.status(500).json({ error: 'Erro ao salvar os dados no banco' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
