const scoreResume = (resumeText) => {
    try {
      const keywords = ['javascript', 'python', 'experience', 'skills', 'project'];
      const lowerText = resumeText.toLowerCase();
      let score = 0;
  
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) score += 20;
      });
  
      return Math.min(score, 100); // Cap at 100
    } catch (error) {
      throw new Error('Scoring failed: ' + error.message);
    }
  };
  
  module.exports = { scoreResume };