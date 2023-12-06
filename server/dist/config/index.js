"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    db_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    default_driver_password: process.env.DEFAULT_DRIVER_PASSWORD,
    default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
    client_url: process.env.CLIENT_URL,
    server_url: process.env.SERVER_URL,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    nodemailer_email: process.env.NODEMAILER_EMAIL,
    nodemailer_password: process.env.NODEMAILER_PASSWORD
};
