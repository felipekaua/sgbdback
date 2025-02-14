require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db('tasks').select('*');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    }
    const [id] = await db('tasks').insert({ name, description });
    res.status(201).json({ id, name, description });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db('tasks').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
