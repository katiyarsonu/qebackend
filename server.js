require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const parserRoutes = require('./routes/parserRoutes');
const scoringRoutes = require('./routes/scoringRoutes');
const templateRoutes = require('./routes/templateRoutes');
const exportRoutes = require('./routes/exportRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/parser', parserRoutes);
app.use('/api/scoring', scoringRoutes);
app.use('/api/template', templateRoutes);
app.use('/api/export', exportRoutes);

// Error Handler
app.use(errorHandler);

// Basic route
app.get('/', (req, res) => {
  res.send('Resume Builder Backend is running');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


