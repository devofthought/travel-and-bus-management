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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield payment_service_1.paymentService.createOrder(req.body);
        res.send({ url: result });
    }
    catch (error) {
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});
const successOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tranId = req.params.tranId;
    const result = yield payment_service_1.paymentService.successOrder(tranId);
    res.redirect(result);
});
const failsOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tranId = req.params.tranId;
    const result = yield payment_service_1.paymentService.failsOrder(tranId);
    res.redirect(result);
});
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tranId = req.params.tranId;
    const result = yield payment_service_1.paymentService.cancelOrder(tranId);
    res.redirect(result);
});
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield payment_service_1.paymentService.stripePayment(data);
        res.send({ url: result });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.paymentController = {
    createOrder,
    successOrder,
    failsOrder,
    cancelOrder,
    stripePayment,
};
