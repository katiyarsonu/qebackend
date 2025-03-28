//old code
// const express = require('express');
// const router = express.Router();
// const { createResume, getResumes } = require('../controllers/ResumeController');
// const authMiddleware = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// router.post('/', authMiddleware, upload.single('file'), createResume);
// router.get('/', authMiddleware, getResumes);

// module.exports = router;

//new code

// const express = require('express');
// const { upload, uploadToCloudinary } = require('../middleware/uploadMiddleware');
// const router = express.Router();

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const fileUrl = await uploadToCloudinary(req.file.path);
//     res.json({ fileUrl });
//   } catch (error) {
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// module.exports = router;


// // ✅ No need for multer-storage-cloudinary
// // ✅ Fully compatible with Cloudinary v2
// // ✅ No dependency conflicts
// // ✅ Works with Multer's local storage + Cloudinary's uploader


const express = require('express');
const { upload, uploadToCloudinary } = require('../middleware/uploadMiddleware');
const { createResume, getResumes } = require('../controllers/ResumeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Upload a file + create a resume
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    let fileUrl = null;

    if (req.file) {
      fileUrl = await uploadToCloudinary(req.file.path);
    }

    const resume = await createResume(req, fileUrl);
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: 'Resume upload failed', details: error.message });
  }
});

// Get all resumes for the logged-in user
router.get('/', authMiddleware, getResumes);

module.exports = router;

