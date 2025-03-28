// const parseResume = (resumeText) => {
//     try {
//       const lines = resumeText.split('\n').map(line => line.trim());
//       const sections = {
//         skills: [],
//         experience: [],
//       };
  
//       let currentSection = null;
//       lines.forEach(line => {
//         if (line.toLowerCase().includes('skills')) currentSection = 'skills';
//         else if (line.toLowerCase().includes('experience')) currentSection = 'experience';
//         else if (currentSection && line) sections[currentSection].push(line);
//       });
  
//       return sections;
//     } catch (error) {
//       throw new Error('Parsing failed: ' + error.message);
//     }
//   };
  
//   module.exports = { parseResume };

// working 
// const pdfParse = require('pdf-parse');

// const parseResume = (resumeText) => {
//   try {
//     const lines = resumeText.split('\n').map(line => line.trim());
//     const sections = {
//       skills: [],
//       experience: [],
//     };

//     let currentSection = null;
//     lines.forEach(line => {
//       if (line.toLowerCase().includes('skills')) currentSection = 'skills';
//       else if (line.toLowerCase().includes('experience')) currentSection = 'experience';
//       else if (currentSection && line) sections[currentSection].push(line);
//     });

//     return sections;
//   } catch (error) {
//     throw new Error('Parsing failed: ' + error.message);
//   }
// };

// const extractPdfText = async (fileBuffer) => {
//   try {
//     const data = await pdfParse(fileBuffer);
//     return data.text;
//   } catch (error) {
//     throw new Error('PDF extraction failed: ' + error.message);
//   }
// };

// module.exports = { parseResume, extractPdfText };


// {
//   "message": "PDF processing failed",
//   "error": "PDF extraction failed: Invalid parameter in getDocument, need either Uint8Array, string or a parameter object"
// } fix it





const pdfParse = require('pdf-parse');
const fs = require('fs').promises;

const parseResume = (resumeText) => {
  try {
    const lines = resumeText.split('\n').map(line => line.trim());
    const sections = {
      skills: [],
      experience: [],
    };

    let currentSection = null;
    lines.forEach(line => {
      if (line.toLowerCase().includes('skills')) currentSection = 'skills';
      else if (line.toLowerCase().includes('experience')) currentSection = 'experience';
      else if (currentSection && line) sections[currentSection].push(line);
    });

    return sections;
  } catch (error) {
    throw new Error('Parsing failed: ' + error.message);
  }
};

const extractPdfText = async (filePath) => {
  try {
    const pdfBuffer = await fs.readFile(filePath); // Read file from disk
    const data = await pdfParse(pdfBuffer); // Pass buffer to pdf-parse
    return data.text;
  } catch (error) {
    throw new Error('PDF extraction failed: ' + error.message);
  }
};

module.exports = { parseResume, extractPdfText };