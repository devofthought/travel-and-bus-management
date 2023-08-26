import express from 'express'
import { TravelerController } from './traveler.controller'
const router = express.Router()

router.get('/', TravelerController.getAllTraveler)
router.get('/:id', TravelerController.getSingleTraveler)

export const TravelerRoutes = router
