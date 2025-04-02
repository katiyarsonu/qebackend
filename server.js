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

// CORS configuration
const corsOptions = {
  origin: ['https://cf3ea265-389b-4f14-955b-0b1de492f5c0-00-1grzzwf0tt0uz.spock.replit.dev:6800','https://qefrontend-git-main-katiyarsonus-projects.vercel.app','https://qefrontend.vercel.app', 'https://qefrontend-9obnrc4qn-katiyarsonus-projects.vercel.app','https://qefront.vercel.app','https://qefront-katiyarsonus-projects.vercel.app/','https://vercel.com/katiyarsonus-projects/qefrontend/H38qHiCG58bgBJ8AYbAWR8uE4gED'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
// Remove or modify the traditional server startup
// Instead of:
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Add:
module.exports = app;


