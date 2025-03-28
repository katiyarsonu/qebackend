// const Resume = require('../models/Resume');
// const { uploadToCloudinary } = require('../services/exportService');

// const createResume = async (req, res) => {
//   const { title, content } = req.body;
//   const userId = req.user._id;

//   try {
//     let fileUrl = null;
//     if (req.file) {
//       fileUrl = await uploadToCloudinary(req.file);
//     }

//     const resume = new Resume({ userId, title, content, fileUrl });
//     await resume.save();
//     res.status(201).json(resume);
//   } catch (error) {
//     res.status(500).json({ message: 'Resume creation failed', error: error.message });
//   }
// };

// const getResumes = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const resumes = await Resume.find({ userId });
//     res.json(resumes);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
//   }
// };

// module.exports = { createResume, getResumes };


//new 

const Resume = require('../models/Resume');

const createResume = async (req, fileUrl) => {
  const { title, content } = req.body;
  const userId = req.user._id;

  try {
    const resume = new Resume({ userId, title, content, fileUrl });
    await resume.save();
    return resume;
  } catch (error) {
    throw new Error('Resume creation failed: ' + error.message);
  }
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
};

module.exports = { createResume, getResumes };
