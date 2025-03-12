import multer from 'multer';

const storage = multer.memoryStorage(); // Simpan file di memori
const upload = multer({ storage });

export default upload;
