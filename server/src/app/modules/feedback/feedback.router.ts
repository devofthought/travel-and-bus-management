import express from 'express'
import { FeedbackValidation } from './feedback.validation'
import validateRequest from '../../middlewares/validateRequest'
import { FeedbackController } from './feedback.controller'
const router = express.Router()

router.get('/', FeedbackController.getAllFeedback) // TODO: only admin can  
router.get('/approved-feedbacks', FeedbackController.getApprovedFeedbacks) // Publish
router.post(
  '/',
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback
)

router.patch(
  '/admin-approved-feedback',
  validateRequest(FeedbackValidation.adminApprovedFeedbackZodSchema),
  FeedbackController.updateAdminApprovedFeedback
)

// TODO: feedback update is not yet implemented for both (admin and user)
router.patch(
  '/:id',
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedback
)
router.get('/:user_id', FeedbackController.getSingleUserFeedback) // TODO: user and admin can get this data
router.delete('/:id', FeedbackController.deleteFeedback)

export const FeedbackRoutes = router
