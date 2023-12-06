import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { BookingRoutes } from '../modules/booking/booking.router'
import { BusRoutes } from '../modules/bus/bus.router'
import { DriverRouter } from '../modules/driver/driver.router'
import { FeedbackRoutes } from '../modules/feedback/feedback.router'
import { IncidentRoutes } from '../modules/incident/incident.router'
import { ReserveBusRoutes } from '../modules/reserveBus/reserveBus.router'
import { RouteRoutes } from '../modules/route/route.router'
import { TravelerRoutes } from '../modules/traveler/traveler.router'
import { TripRoutes } from '../modules/trip/trip.router'
import { UserRouter } from '../modules/user/user.router'
import { PaymentRoutes } from '../modules/payment/payment.router'
import { SupportRoutes } from '../modules/support/support.router'

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
  { path: '/booking', router: BookingRoutes },
  { path: '/payment', router: PaymentRoutes },
  { path: '/support', router: SupportRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
