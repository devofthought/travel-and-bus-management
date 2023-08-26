import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { UserRouter } from '../modules/user/user.router'
import { DriverRouter } from '../modules/driver/driver.router'
import { RouteRoutes } from '../modules/route/route.router'
import { BusRoutes } from '../modules/bus/bus.router'
import { FeedbackRoutes } from '../modules/feedback/feedback.router'
import { ReserveBusRoutes } from '../modules/reserveBus/reserveBus.router'
import { TripRoutes } from '../modules/trip/trip.router'
import { TravelerRoutes } from '../modules/traveler/traveler.router'
import { IncidentRoutes } from '../modules/incident/incident.router'

const router = express.Router()

const moduleRoutes = [
  { path: '/auth', router: AuthRouter },
  { path: '/users', router: UserRouter },
  { path: '/driver', router: DriverRouter },
  { path: '/route', router: RouteRoutes },
  { path: '/buses', router: BusRoutes },
  { path: '/feedback', router: FeedbackRoutes },
  { path: '/reserveBus', router: ReserveBusRoutes },
  { path: '/trips', router: TripRoutes },
  { path: '/traveler', router: TravelerRoutes },
  { path: '/incident', router: IncidentRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
