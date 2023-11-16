"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const config_1 = __importDefault(require("../../../config"));
const uuidv4_1 = require("uuidv4");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config_1.default.stripe_secret_key);
const store_id = config_1.default.store_id;
const store_passwd = config_1.default.store_password;
const is_live = false;
const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
const tran_id = (0, uuidv4_1.uuid)().slice(24, 36);
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        total_amount: orderData.price,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `${config_1.default.server_url}/api/v1/payment/order/success/${tran_id}`,
        fail_url: `${config_1.default.server_url}/api/v1/payment/order/fail/${tran_id}`,
        cancel_url: `${config_1.default.server_url}/api/v1/payment/order/cancel/${tran_id}`,
        ipn_url: `${config_1.default.server_url}/ipn`,
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
    };
    try {
        const apiResponse = yield sslcz.init(data);
        return apiResponse.GatewayPageURL;
    }
    catch (error) {
        throw new Error('Payment initiation failed');
    }
});
const successOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = `${config_1.default.client_url}/payment/success/${id}`;
    return result;
});
const failsOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = `${config_1.default.client_url}/payment/fail/${id}`;
    return result;
});
const cancelOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = `${config_1.default.client_url}/payment/cancel/${id}`;
    return result;
});
const stripePayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe.checkout.sessions.create({
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
            };
        }),
        success_url: `${config_1.default.client_url}/payment/success/${tran_id}`,
        cancel_url: `${config_1.default.client_url}/payment/cancel/${tran_id}`,
    });
    return session.url;
});
exports.paymentService = {
    createOrder,
    successOrder,
    failsOrder,
    cancelOrder,
    stripePayment,
};
