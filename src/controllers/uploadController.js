import { uploadFileToS3 } from '../services/s3Service.js';

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File tidak ditemukan' });
        }

        console.log('Uploading file:', req.file.originalname);

        const fileUrl = await uploadFileToS3(req.file);

        res.status(200).json({ message: 'File berhasil diupload', data: fileUrl });
    } catch (error) {
        console.error('Upload File Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengupload file', details: error.message });
    }
};

export default { uploadFile };
