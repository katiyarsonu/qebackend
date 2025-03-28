const express = require('express');
const router = express.Router();
const { scoreResumeText } = require('../controllers/ScoringController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/score', authMiddleware, scoreResumeText);

module.exports = router;