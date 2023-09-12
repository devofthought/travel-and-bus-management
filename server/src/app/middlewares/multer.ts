import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express' // Assuming you are using Express

type CustomFile = Express.Multer.File

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

export default multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 2000000,
  },
  fileFilter: (_req: Request, file: CustomFile, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      const error: Error = new Error('File type is not supported')
      cb(error as unknown as null, false)
      return
    }
    cb(null, true)
  },
})

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
