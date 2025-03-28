// const { parseResume } = require('../services/parserService');

// const parseResumeText = async (req, res) => {
//   const { resumeText } = req.body;
//   if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

//   try {
//     const parsedData = parseResume(resumeText);
//     res.json({ parsedData });
//   } catch (error) {
//     res.status(500).json({ message: 'Parsing failed', error: error.message });
//   }
// };

// module.exports = { parseResumeText };



// //working 
// const { parseResume, extractPdfText } = require('../services/parserService');
// const Resume = require('../models/Resume');
// const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

// const parseResumeText = async (req, res) => {
//   const { resumeText } = req.body;
//   if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

//   try {
//     const parsedData = parseResume(resumeText);
//     res.json({ parsedData });
//   } catch (error) {
//     res.status(500).json({ message: 'Parsing failed', error: error.message });
//   }
// };

// const extractPdfResume = async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: 'PDF file is required' });

//   const userId = req.user._id;
//   try {
//     // Extract text from PDF
//     const pdfText = await extractPdfText(req.file.buffer);

//     // Upload PDF to Cloudinary
//     const fileUrl = await uploadToCloudinary(req.file.path);

//     // Save to database
//     const resume = new Resume({
//       userId,
//       title: req.file.originalname || 'Uploaded Resume',
//       content: pdfText,
//       fileUrl,
//     });
//     await resume.save();

//     res.json({ extractedText: pdfText, resumeId: resume._id, fileUrl });
//   } catch (error) {
//     res.status(500).json({ message: 'PDF processing failed', error: error.message });
//   }
// };

// module.exports = { parseResumeText, extractPdfResume };


//could not extract pdf error changes 

const { parseResume, extractPdfText } = require('../services/parserService');
const Resume = require('../models/Resume');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

const parseResumeText = async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

  try {
    const parsedData = parseResume(resumeText);
    res.json({ parsedData });
  } catch (error) {
    res.status(500).json({ message: 'Parsing failed', error: error.message });
  }
};

const extractPdfResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'PDF file is required' });

  const userId = req.user._id;
  try {
    // Extract text from PDF using file path
    const pdfText = await extractPdfText(req.file.path);

    // Upload PDF to Cloudinary
    const fileUrl = await uploadToCloudinary(req.file.path);

    // Save to database
    const resume = new Resume({
      userId,
      title: req.file.originalname || 'Uploaded Resume',
      content: pdfText,
      fileUrl,
    });
    await resume.save();

    res.json({ extractedText: pdfText, resumeId: resume._id, fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'PDF processing failed', error: error.message });
  }
};

module.exports = { parseResumeText, extractPdfResume };