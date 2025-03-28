// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'resume-builder',
//     allowed_formats: ['pdf', 'jpg', 'png'],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


//new version  npm install multer cloudinary


// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const fs = require('fs');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure Multer to store file locally before upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Temporary storage
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Cloudinary Upload Function
// const uploadToCloudinary = async (localFilePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(localFilePath, {
//       folder: 'uploads' // Change as needed
//     });
//     fs.unlinkSync(localFilePath); // Remove local file after upload
//     return result.secure_url; // Return Cloudinary URL
//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     throw error;
//   }
// };

// module.exports = { upload, uploadToCloudinary };


// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const fs = require('fs');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure Multer (store file locally first)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Temporary storage folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Upload file to Cloudinary and delete locally after success
// const uploadToCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) throw new Error("File path is missing!");

//     const result = await cloudinary.uploader.upload(localFilePath, {
//       folder: 'resume_uploads' // Folder in Cloudinary
//     });

//     // Remove local file only if upload is successful
//     try {
//       fs.unlinkSync(localFilePath);
//     } catch (err) {
//       console.error('Failed to delete local file:', err);
//     }

//     return result.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload failed:', error);
//     throw error;
//   }
// };

// module.exports = { upload, uploadToCloudinary };

//working 

// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const fs = require('fs').promises; // Use promises for async cleanup
// const path = require('path');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer to store files temporarily
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) return cb(null, true);
//     cb(new Error('Only PDF, JPG, and PNG files are allowed!'));
//   },
// });

// // Cloudinary Upload Function
// const uploadToCloudinary = async (localFilePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(localFilePath, {
//       folder: 'resume-builder', // Match your previous folder
//       resource_type: 'auto',
//     });
//     await fs.unlink(localFilePath); // Async cleanup
//     return result.secure_url;
//   } catch (error) {
//     await fs.unlink(localFilePath).catch(() => {}); // Cleanup even on error
//     throw new Error('Cloudinary upload failed: ' + error.message);
//   }
// };

// module.exports = { upload, uploadToCloudinary };

//changes after pdf error not ectract 

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// // Configure Multer to store files temporarily
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

//For file uploads and the uploads directory, you'll need to modify the uploadMiddleware.js to use tmp directory instead since Vercel's filesystem is read-only:
//changed code 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp'); // Change uploads/ to /tmp
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Only PDF, JPG, and PNG files are allowed!'));
  },
});

// Cloudinary Upload Function
const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'resume-builder',
      resource_type: 'auto',
    });
    await fs.unlink(localFilePath);
    return result.secure_url;
  } catch (error) {
    await fs.unlink(localFilePath).catch(() => {});
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

module.exports = { upload, uploadToCloudinary };