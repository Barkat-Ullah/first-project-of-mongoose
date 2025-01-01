import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_key,
  api_secret: config.cloudinary_secret,
});

// Function to upload an image to Cloudinary
const sendImageToCloudinary = (
  imageName: string,
  filePath: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(filePath, {
        public_id: imageName.trim(),
      })
      .then((result) => {
        // Delete the file after successful upload
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully.');
          }
        });
        resolve(result);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error uploading to Cloudinary:', error);
        reject(error);
      });
  });
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

export default sendImageToCloudinary;
