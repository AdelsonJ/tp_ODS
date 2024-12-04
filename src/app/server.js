const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

// Configura o middleware CORS
app.use(cors());
app.use(express.json());

// Endpoint para obter e salvar local
app.get('/local', (req, res) => {
    const filePath = path.join(__dirname, '../../public/json/local.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo JSON');
        }
        res.send(data);
    });
});

app.post('/saveLocal', (req, res) => {
    console.log("Requisição POST recebida!");

    const newLocal = req.body;
    const filePath = path.join(__dirname, '../../public/json/local.json'); // Certifique-se de declarar aqui

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }

        let jsonData = [];
        
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                return res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
            }
        }

        // Encontrar o próximo id
        const ids = jsonData.map(local => local.id); // Pega todos os ids existentes
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1; // Se não houver ids, começa com 1, caso contrário, pega o próximo id

        // Atualiza o novo local com o id correto
        const localComId = {
            ...newLocal,
            id: nextId,
        };

        jsonData.push(localComId); // Adiciona o novo local com id

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar o arquivo JSON' });
            }
            console.log("Local salvo com sucesso!");
            res.json({ message: 'Dados do local salvos com sucesso' });
        });
    });
});

app.delete('/deleteLocal', (req, res) => {
    const { ids } = req.body;
    const filePath = path.join(__dirname, '../../public/json/local.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }

        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                return res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
            }
        }

        // Filtra os locais que não estão na lista de IDs selecionados
        const updatedData = jsonData.filter((local) => !ids.includes(local.id));

        // Salva o novo arquivo JSON com os locais restantes
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar o arquivo JSON' });
            }
            console.log("Locais excluídos com sucesso!");
            res.json({ message: 'Locais excluídos com sucesso' });
        });
    });
});

// Endpoint para obter e salvar servico
app.get('/servico', (req, res) => {
    const filePath = path.join(__dirname, '../../public/json/servico.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo JSON');
        }
        res.send(data);
    });
});

app.post('/saveServico', (req, res) => {
    console.log("Requisição POST recebida!")

    const newServico = req.body;
    const filePath = path.join(__dirname, '../../public/json/servico.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }

        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                return res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
            }
        }

        // Encontrar o próximo id
        const ids = jsonData.map(servico => servico.id); // Pega todos os ids existentes
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1; // Se não houver ids, começa com 1, caso contrário, pega o próximo id
        
        // Atualiza o novo servico com o id correto
        const servicoComId = {
            ...newServico,
            id: nextId,
        };

        jsonData.push(servicoComId); // Adiciona o novo local com id

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar o arquivo JSON' });
            }
            console.log("Serviço salvo com sucesso!");
            res.json({ message: 'Dados do serviço salvos com sucesso' });
        });
    })
})

app.delete('/deleteServico', (req, res) => {
    const { ids } = req.body;
    const filePath = path.join(__dirname, '../../public/json/servico.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
        }

        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                return res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
            }
        }

        // Filtra os servicos que não estão na lista de IDs selecionados
        const updatedData = jsonData.filter((servico) => !ids.includes(servico.id));

        // Salva o novo arquivo JSON com os servicos restantes
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar o arquivo JSON' });
            }
            console.log("Serviços excluídos com sucesso!");
            res.json({ message: 'Serviços excluídos com sucesso' });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
