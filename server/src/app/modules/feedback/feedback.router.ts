import express from 'express'
import { FeedbackValidation } from './feedback.validation'
import validateRequest from '../../middlewares/validateRequest'
import { FeedbackController } from './feedback.controller'
const router = express.Router()

router.get('/', FeedbackController.getAllFeedback)
router.get('/approved-feedbacks', FeedbackController.getApprovedFeedbacks)
router.post(
  '/',
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback
)
router.patch(
  '/:id',
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedback
)
router.get('/:user_id', FeedbackController.getSingleUserFeedback)
router.delete('/:id', FeedbackController.deleteFeedback)

export const FeedbackRoutes = router
