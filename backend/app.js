const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conecta ao banco de dados
connectDB();

// Middleware para leitura de JSON
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
