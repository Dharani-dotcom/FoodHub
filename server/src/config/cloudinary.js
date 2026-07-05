import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload_stream(
      {
        folder: 'foodhub',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );

    return result;
  } catch (error) {
    console.error(`❌ Cloudinary Upload Error: ${error.message}`);
    throw new Error('Image upload failed');
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error(`❌ Cloudinary Delete Error: ${error.message}`);
    throw new Error('Image deletion failed');
  }
};

export const updateImage = async (oldPublicId, file) => {
  try {
    await deleteImage(oldPublicId);
    return await uploadImage(file);
  } catch (error) {
    console.error(`❌ Cloudinary Update Error: ${error.message}`);
    throw new Error('Image update failed');
  }
};

export default cloudinary;
