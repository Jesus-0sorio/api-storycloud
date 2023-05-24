/* eslint-disable prettier/prettier */
export const renameImage = (req, file, cb) => {
  const name = file.originalname.split('.')[0];
  const fileName = file.originalname;
  const randomeName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randomeName}${fileName}`);
};

export const fileFilter = (req, file, cb) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid format type'), false);
  }
}

