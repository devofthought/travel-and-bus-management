import config from '../../../config'
import { uuid } from 'uuidv4'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config.stripe_secret_key)
const store_id = config.store_id
const store_passwd = config.store_password
const is_live = false
const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)

type IOrderData = {
  id: string
  name: string
  price: number
  phone: number
  quantity: number
}

const tran_id = uuid().slice(24, 36)

const createOrder = async (orderData: IOrderData) => {
  const data = {
    total_amount: orderData.price,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${config.server_url}/api/v1/payment/order/success/${tran_id}`,
    fail_url: `${config.server_url}/api/v1/payment/order/fail/${tran_id}`,
    cancel_url: `${config.server_url}/api/v1/payment/order/cancel/${tran_id}`,
    ipn_url: `${config.server_url}/ipn`,
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: orderData.name,
    cus_email: 'example@gmail.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: orderData.phone,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  }
  try {
    const apiResponse = await sslcz.init(data)
    return apiResponse.GatewayPageURL
  } catch (error) {
    throw new Error('Payment initiation failed')
  }
}

const successOrder = async (id: string) => {
  const result = `${config.client_url}/payment/success/${id}`
  return result
}

const failsOrder = async (id: string) => {
  const result = `${config.client_url}/payment/fail/${id}`
  return result
}
const cancelOrder = async (id: string) => {
  const result = `${config.client_url}/payment/cancel/${id}`
  return result
}

const stripePayment = async (data: { items: [IOrderData] }) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: data.items.map(item => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Bus Ticket',
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }
    }),

    success_url: `${config.client_url}/payment/success/${tran_id}`,
    cancel_url: `${config.client_url}/payment/cancel/${tran_id}`,
  })
  return session.url
}

export const paymentService = {
  createOrder,
  successOrder,
  failsOrder,
  cancelOrder,
  stripePayment,
}
