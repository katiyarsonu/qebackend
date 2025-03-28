// const express = require('express');
// const router = express.Router();
// const { parseResumeText } = require('../controllers/ParserController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/parse', authMiddleware, parseResumeText);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { parseResumeText, extractPdfResume } = require('../controllers/ParserController');
const authMiddleware = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/parse', authMiddleware, parseResumeText);
router.post('/extract-pdf', authMiddleware, upload.single('pdf'), extractPdfResume);

module.exports = router;