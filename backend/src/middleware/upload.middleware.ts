import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (folder: string) =>
  multer.diskStorage({
    destination: (_, __, cb) => {
      const dir = path.join(__dirname, '../../uploads', folder);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (_, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

const imageFilter = (
  _: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

export const uploadBlogImage = multer({
  storage: createStorage('blogs'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadUniversityLogo = multer({
  storage: createStorage('universities'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadSpecialtyImage = multer({
  storage: createStorage('specialties'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});