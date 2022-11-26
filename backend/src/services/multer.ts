import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Please submit only images!'));
    }
  },
});
