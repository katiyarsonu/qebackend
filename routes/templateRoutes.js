const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate } = require('../controllers/TemplateController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getTemplates); // Public access
router.post('/', authMiddleware, createTemplate); // Protected

module.exports = router;