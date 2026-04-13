import { v2 as cloudinary } from 'cloudinary'
import { response } from 'express';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, { folder: "youflix", resource_type: "auto" });
        console.log("File is upload on Cloudinary",response.url);
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error("Error uploading file to Cloudinary", error);
        throw error;
    }
}

export { uploadToCloudinary};
