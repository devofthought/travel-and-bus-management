import { Request, Response } from 'express'
import { paymentService } from './payment.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await paymentService.createOrder(req.body)
    res.send({ url: result })
  } catch (error) {
    res.status(500).json({ error: 'Payment initiation failed' })
  }
}

const successOrder = async (req: Request, res: Response) => {
  const tranId = req.params.tranId
  const result = await paymentService.successOrder(tranId)
  res.redirect(result)
}
const failsOrder = async (req: Request, res: Response) => {
  const tranId = req.params.tranId
  const result = await paymentService.failsOrder(tranId)
  res.redirect(result)
}
const cancelOrder = async (req: Request, res: Response) => {
  const tranId = req.params.tranId
  const result = await paymentService.cancelOrder(tranId)
  res.redirect(result)
}

const stripePayment = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const result = await paymentService.stripePayment(data)
    res.send({ url: result })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const paymentController = {
  createOrder,
  successOrder,
  failsOrder,
  cancelOrder,
  stripePayment,
}
