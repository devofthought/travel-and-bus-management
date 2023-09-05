import express from 'express'
import { paymentController } from './payment.controller'
const router = express.Router()

router.post('/order', paymentController.createOrder)
router.post('/order/success/:tranId', paymentController.successOrder)
router.post('/order/fail/:tranId', paymentController.failsOrder)
router.post('/order/cancel/:tranId', paymentController.cancelOrder)
router.post('/stripe/order', paymentController.stripePayment)

export const PaymentRoutes = router
