const express = require('express');
const router = express.Router();
const { generateResumeSuggestions } = require('../controllers/AIController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/suggestions', authMiddleware, generateResumeSuggestions);

module.exports = router;