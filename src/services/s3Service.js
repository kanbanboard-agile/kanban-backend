import s3Client from '../config/awsConfig.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

class S3Service {
  async uploadFile(file, folder) {
    try {
      const bucket = process.env.AWS_S3_BUCKET;
      const region = process.env.AWS_REGION;
      if (!bucket || !region) {
        throw new Error('AWS_S3_BUCKET or AWS_REGION is not defined in .env');
      }

      // Encode nama file biar URL-safe, tapi tetep readable
      const encodedFilename = encodeURIComponent(file.originalname.replace(/ /g, '-')); // Ganti spasi jadi -
      const uniqueFilename = `${uuidv4()}-${encodedFilename}`;
      console.log('Uploading with Key:', `${folder}/${uniqueFilename}`); // Debug
      const params = {
        Bucket: bucket,
        Key: `${folder}/${uniqueFilename}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${params.Key}`;
      console.log('Generated S3 URL:', fileUrl); // Debug
      return fileUrl;
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  async deleteFile(fileUrl) {
    try {
      const bucket = process.env.AWS_S3_BUCKET;
      const key = fileUrl.split('.com/')[1];
      const params = {
        Bucket: bucket,
        Key: key,
      };
      const command = new DeleteObjectCommand(params);
      await s3Client.send(command);
      console.log('File deleted from S3:', key);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }
}

export default new S3Service();
