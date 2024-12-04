const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Database Connection
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // URL do frontend
    credentials: true
  }));
  

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;