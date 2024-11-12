const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// Rota para registro
router.post('/register', register);

module.exports = router;
