"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Multer config
// const storage = multer.diskStorage({})
// const fileFilter = (req: Request, file: CustomFile, cb: FileFilterCallback) => {
//   const ext = path.extname(file.originalname)
//   console.log(`File ${file.originalname}`)
//   if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//     const error: Error = new Error('File type is not supported')
//     cb(error as unknown as null, false)
//     return
//   }
//   cb(null, true)
// }
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// })
// export default upload
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    limits: {
        fileSize: 2000000,
    },
    fileFilter: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const error = new Error('File type is not supported');
            cb(error, false);
            return;
        }
        cb(null, true);
    },
});
// if (req.file && req.file.fieldname === 'outer_image') {
//   const image = req.file
//     ? await cloudinary.uploader.upload(req.file?.path)
//     : null
//   if (image) {
//     const avatar = {
//       avatar: image.secure_url,
//       avatar_public_url: image.public_id,
//     }
//     bus.outer_image = avatar
//   }
// }
