require('dotenv').config('./config/.env'); // Carrega as variáveis do .env
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Conectando ao MongoDB...');
        await mongoose.connect(process.env.MONGO_URI); // Removendo opções obsoletas
        console.log('Conectado ao MongoDB com sucesso');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

module.exports = connectDB;
