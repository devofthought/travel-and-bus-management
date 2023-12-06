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
exports.travelerUserInfoSendByEmail = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const nodemailer_1 = __importDefault(require("nodemailer"));
const __1 = __importDefault(require(".."));
const travelerUserInfoSendByEmail = (message) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: __1.default.nodemailer_email,
            pass: __1.default.nodemailer_password,
        },
    });
    const messageBody = `<div>
                    <div
                    style="
                      width: 40%;
                      margin: 0 auto;
                      background-color: #EAE7E6;
                      padding: 48px;
                    "
                  >
                    <div style="background-color: white; padding: 20px; border-radius: 24px">
                      <div style="display: flex; align-items: center">
                        <div>
                          <img src="https://i.ibb.co/cXCWRsG/bus.png" alt="bus" />
                        </div>
                        <div style="margin-left: 16px">
                          <h1 style="margin-bottom: 0px; font-size: 28px;">Dhruto Travel</h1>
                          <h3 style="margin-top: 0;">Book with Ease, Travel with Speed</h3>
                        </div>
                      </div>
                      <hr />
                      <h2>Hello ${message.name},</h2>
              
                      <p>
                        Cheers to joining Dhruto Travel - your go-to spot for hassle-free bus
                        travel! 🚌 We're pumped to be your travel companion and make your bus
                        journeys a breeze.
                      </p>
              
                      <h4 style="margin-bottom: 8px; font-weight: bold;">Your Login Details:</h4>
              
                      <p style="margin-top: 0; margin-right: 0; margin-bottom: 2px; margin-left: 16px;">
                        Name: <span style="font-weight: 600;">${message.name}</span>
                      </p>
                      <p style="margin-top: 0; margin-right: 0; margin-bottom: 2px; margin-left: 16px;">
                        Role: <span style="font-weight: 600;">${message.role}</span>
                      </p>
                      <p style="margin-top: 0; margin-right: 0; margin-bottom: 2px; margin-left: 16px;">
                        Email: <span style="font-weight: 600;">${message.email}</span>
                      </p>
                      <p style="margin-top: 0; margin-right: 0; margin-bottom: 2px; margin-left: 16px;">
                        Password: <span style="font-weight: 600;">${message.password}</span>
                      </p>
              
                      <p>
                        <p style="margin-bottom: -12px">To help you get started, here are a few key features and benefits
                          of your Dhruto Travel account:</p>
              
              
                        <span style="font-weight: 600">Easy Booking Process:</span>
                        Our user-friendly platform ensures a smooth and straightforward
                        booking experience. Explore various bus routes, choose your preferred
                        seat, and secure your tickets with just a few clicks.
                        <br />
                        <span style="font-weight: 600">Exclusive Offers:</span>
                        As a Dhruto Travel member, you will be among the first to know about
                        our special promotions, discounts, and exclusive offers. Keep an eye
                        on your inbox for exciting deals on your favorite routes!
                        <br />
                        <span style="font-weight: 600">Personalized Travel History:</span>
                        Track and manage your travel history effortlessly through your
                        account. Access details of your past trips, upcoming journeys, and any
                        exclusive rewards you've earned along the way. <br />
                        <span style="font-weight: 600">24/7 Customer Support:</span>
                        We're here for you! Our dedicated customer support team is available
                        24/7 to assist you with any inquiries, concerns, or assistance you may
                        need. Feel free to reach out at +880156386034.
                        <br /> <br/>
              
                        Thank you for choosing Dhruto Travel for your journey needs. We look
                        forward to being a part of your travel adventures!
                      </p>
              
                      <p style="font-weight: 600; margin-bottom: 0px;">Safe Travels,</p>
                      <p style="margin-top: 0px">Dhruto Travel Team</p>
                    </div>
                  </div>
                    </div>
                    `;
    const mailOption = {
        from: 'mdkzaman2025@gmail.com',
        to: message.email,
        subject: 'Welcome to Dhruto Travel - Your Bus Adventure Starts Now!',
        // subject: 'Account credential of Dhruto travel',
        html: messageBody,
    };
    transporter.sendMail(mailOption, (error, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent to the traveler: ' + info.response);
        }
    }));
};
exports.travelerUserInfoSendByEmail = travelerUserInfoSendByEmail;
