import express from 'express'
import { TravelerController } from './traveler.controller'
const router = express.Router()

router.get('/', TravelerController.getAllTraveler)

export const TravelerRoutes = router
