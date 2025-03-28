const Template = require('../models/Template');

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch templates', error: error.message });
  }
};

const createTemplate = async (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) return res.status(400).json({ message: 'Name and content are required' });

  try {
    const template = new Template({ name, content });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Template creation failed', error: error.message });
  }
};

module.exports = { getTemplates, createTemplate };