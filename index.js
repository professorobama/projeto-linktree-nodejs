// index.js (Nosso Backend CRUD Completo)

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Essencial para req.body (PUT e POST)
app.use(express.static('public')); // Servir nosso frontend

// Configuração do Banco de Dados
// (Lembre os alunos de alterarem para suas credenciais)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // <-- MUDAR AQUI
    database: 'linktree_db'       // <-- MUDAR AQUI
};

// --- API RESTful CRUD ---

// [C]REATE - Criar um novo link
app.post('/api/links', async (req, res) => {
    const { titulo, url } = req.body;
    
    if (!titulo || !url) {
        return res.status(400).json({ message: 'Título e URL são obrigatórios.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'INSERT INTO tbl_links (titulo, url) VALUES (?, ?)';
        const [result] = await connection.execute(query, [titulo, url]);
        await connection.end();
        
        // Retorna o novo link criado (com o ID)
        res.status(201).json({ id: result.insertId, titulo, url });
    } catch (error) {
        console.error('Erro ao criar link:', error);
        res.status(500).json({ message: 'Erro ao criar link.' });
    }
});

// [R]EAD - Buscar todos os links
app.get('/api/links', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM tbl_links ORDER BY id ASC');
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar links:', error);
        res.status(500).json({ message: 'Erro ao buscar links.' });
    }
});

// [U]PDATE - Atualizar um link
app.put('/api/links/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL
    const { titulo, url } = req.body; // Pega os novos dados do corpo

    if (!titulo || !url) {
        return res.status(400).json({ message: 'Título e URL são obrigatórios.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'UPDATE tbl_links SET titulo = ?, url = ? WHERE id = ?';
        const [result] = await connection.execute(query, [titulo, url, id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Link não encontrado.' });
        }

        res.json({ message: 'Link atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar link:', error);
        res.status(500).json({ message: 'Erro ao atualizar link.' });
    }
});

// [D]ELETE - Excluir um link
app.delete('/api/links/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'DELETE FROM tbl_links WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Link não encontrado.' });
        }

        res.json({ message: 'Link excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir link:', error);
        res.status(500).json({ message: 'Erro ao excluir link.' });
    }
});

// Iniciar o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});