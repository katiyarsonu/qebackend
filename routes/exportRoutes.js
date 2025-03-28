const express = require('express');
const router = express.Router();
const { exportResume } = require('../controllers/ExportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:resumeId', authMiddleware, exportResume);

module.exports = router;