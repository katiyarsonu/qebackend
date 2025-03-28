const { generateText } = require('../services/aiService');

const generateResumeSuggestions = async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

  try {
    const prompt = `Rewrite the following input in 3 different ATS-friendly ways all ways sholud be unique . Provide only the rewritten outputs in list format, without any additional instructions or explanations.  ${resumeText}`;
    const suggestions = await generateText(prompt);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'AI processing failed', error: error.message });
  }
};

module.exports = { generateResumeSuggestions };