import express from 'express'
import { TravelerController } from './traveler.controller'
import validateRequest from '../../middlewares/validateRequest'
import { TravelerValidation } from './traveler.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import multer from '../../middlewares/multer'
const router = express.Router()

router.get('/', TravelerController.getAllTraveler)
router.patch(
  '/traveler-profile',
  auth(ENUM_USER_ROLE.USER),
  multer.single('profile_image'),
  validateRequest(TravelerValidation.updateTravelerZodSchema),
  TravelerController.updateTraveler
)

router.get('/:id', TravelerController.getSingleTraveler)
export const TravelerRoutes = router
