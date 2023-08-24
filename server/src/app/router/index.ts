import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { UserRouter } from '../modules/user/user.router'
import { DriverRouter } from '../modules/driver/driver.router'
import { RouteRoutes } from '../modules/route/route.router'
import { BusRoutes } from '../modules/bus/bus.router'
const router = express.Router()

const moduleRoutes = [
  { path: '/auth', router: AuthRouter },
  { path: '/users', router: UserRouter },
  { path: '/driver', router: DriverRouter },
  { path: '/route', router: RouteRoutes },
  { path: '/buses', router: BusRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
