const Resume = require('../models/Resume');

const exportResume = async (req, res) => {
  const { resumeId } = req.params;
  const userId = req.user._id;

  try {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    res.json({ fileUrl: resume.fileUrl, title: resume.title });
  } catch (error) {
    res.status(500).json({ message: 'Export failed', error: error.message });
  }
};

module.exports = { exportResume };