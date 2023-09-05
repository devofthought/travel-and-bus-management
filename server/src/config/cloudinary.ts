import { v2 as cloudinary } from 'cloudinary'
import configs from './index'

cloudinary.config({
  cloud_name: configs.cloudinary_cloud_name as string,
  api_key: configs.cloudinary_api_key as string,
  api_secret: configs.cloudinary_api_secret as string,
})

export default cloudinary
