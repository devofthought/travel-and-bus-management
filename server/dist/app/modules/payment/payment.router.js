"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/order', payment_controller_1.paymentController.createOrder);
router.post('/order/success/:tranId', payment_controller_1.paymentController.successOrder);
router.post('/order/fail/:tranId', payment_controller_1.paymentController.failsOrder);
router.post('/order/cancel/:tranId', payment_controller_1.paymentController.cancelOrder);
router.post('/stripe/order', payment_controller_1.paymentController.stripePayment);
exports.PaymentRoutes = router;
