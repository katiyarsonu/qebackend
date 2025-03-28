// const cloudinary = require('cloudinary').v2;

// const uploadToCloudinary = async (file) => {
//   try {
//     const result = await cloudinary.uploader.upload(file.path, {
//       resource_type: 'auto',
//     });
//     return result.secure_url;
//   } catch (error) {
//     throw new Error('Cloudinary upload failed: ' + error.message);
//   }
// };

// module.exports = { uploadToCloudinary };


const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

module.exports = { uploadToCloudinary };