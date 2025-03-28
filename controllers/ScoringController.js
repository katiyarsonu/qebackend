const { scoreResume } = require('../services/scoringService');

const scoreResumeText = async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

  try {
    const score = scoreResume(resumeText);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: 'Scoring failed', error: error.message });
  }
};

module.exports = { scoreResumeText };