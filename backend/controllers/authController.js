const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já registrado com este e-mail' });
        }

        // Cria um novo usuário
        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
