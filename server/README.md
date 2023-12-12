<div align="center">

<h1 align="center">

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/nodejs_alt.svg" width="100" />

<br>
Dhruto travel Backend

</h1>

<h3>◦ Developed with the software and tools below.</h3>


<p align="center">

<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />

<!-- <img src="https://img.shields.io/badge/Jest-C21325.svg?style&logo=Jest&logoColor=white" alt="Jest" /> -->

<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />

<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style&logo=ts-node&logoColor=white" alt="tsnode" />

<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />


<!-- <img src="https://img.shields.io/badge/Docker-2496ED.svg?style&logo=Docker&logoColor=white" alt="Docker" /> -->

<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />

<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />

<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />

<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />

</p>

<img src="https://img.shields.io/github/languages/top/devofthought/travel-and-bus-management?style&color=5D6D7E" alt="GitHub top language" />

<img src="https://img.shields.io/github/languages/code-size/devofthought/travel-and-bus-management?style&color=5D6D7E" alt="GitHub code size in bytes" />

<img src="https://img.shields.io/github/commit-activity/m/devofthought/travel-and-bus-management?style&color=5D6D7E" alt="GitHub commit activity" />

[//]: # (<img src="https://img.shields.io/github/license/devofthought/travel-and-bus-management?style&color=5D6D7E" alt="GitHub license" />)

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [🔧 Installation](#-installation)
  - [Configuration](#configuration)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Deployment Instructions](#deployment-instructions)

## Introduction

_Thrives on connectivity and convenience, the transportation industry is at the forefront of transforming the way people travel. Welcome to “Dhruto travel”, your ultimate solution for streamlined bus ticket booking and efficient bus agency management._


## Features

- Modular architecture for easy scalability and maintenance.
- User authentication and authorization.
- Secure password hashing using bcrypt.
- JSON Web Token (JWT) based authentication.
- CORS support for cross-origin requests.
- MongoDB database integration via Mongoose.
- Express.js for building RESTful APIs.
- Environment variables management with dotenv.
- Email sending capabilities (Nodemailer).
- API documentation using Swagger UI Express and postman.
<!-- - Testing setup with Jest and Supertest. -->
- TypeScript support for improved code quality and maintainability.

## Folder Structure

Here is an overview of your project's folder structure:

```
.
├── .husky/                     
│   └── pre-commit/     
├── .vscode/             
│   ├── setting.json/     
│   └── settings.json/ 
├── dist/              
├── src/                        # Source code directory
│   ├── App/                    # Main application code
│   │   ├── middlewares/  
│   │   │   ├── auth/ 
│   │   │   ├── globalErrorHandler/ 
│   │   │   ├── multer/ 
│   │   │   └── validation/ 
│   │   ├── modules/             # Modules for various features
│   │   │   ├── Admin/ 
│   │   │   ├── Auth/            # Authentication related code
│   │   │   ├── booking/ 
│   │   │   ├── bus/ 
│   │   │   ├── driver/ 
│   │   │   ├── feedback/ 
│   │   │   ├── incident/ 
│   │   │   ├── payment/ 
│   │   │   ├── reserveBus/ 
│   │   │   ├── route/ 
│   │   │   ├── support/ 
│   │   │   ├── travel/ 
│   │   │   ├── trip/ 
│   │   │   └── User/            # User management code
│   │   ├── routes/   
│   │   │   └── index.js/
│   ├── Config/                 # Configuration files
│   │   ├── emailHandle/ 
│   │   ├── cloudinary/ 
│   │   └── index/ 
│   ├── constants/         
│   │   └── pagination/ 
│   ├── enums/         
│   │   └── user/
│   ├── error/         
│   │   ├── ApiError/
│   │   ├── handleCastError/
│   │   ├── handleValidationError/
│   │   └── handleZodError/
│   ├── helper/         
│   │   ├── bcryptHelpers/
│   │   ├── googleAuth/
│   │   ├── jwtHelpers/
│   │   └── paginationHelper/
│   ├── interface/         
│   │   ├── common/
│   │   ├── error/
│   │   ├── pagination/
│   │   └── index/
│   ├── interface/         
│   │   ├── catchAsync/
│   │   ├── logger/
│   │   ├── pick/
│   │   └── sendResponse/
│   ├── Middlewares/             # Express middlewares
│   ├── Routes/                  # API route definitions
│   ├── Utils/                   # Utility functions and modules
│   │   └── utilities/       
│   ├── app.ts                   # Main application entry point
│   └── index.ts                 # Application startup script
├── .env                         # Environment variables configuration
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierrc
├── package.json        
├── tsconfig           
├── vercel          
└── README.md                    # Project documentation (you are here)

```

## Prerequisites

List the prerequisites and dependencies that users need to have installed to run your application. For example:

- [Node.js](https://nodejs.org/) (>=14.20.1)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## 🔧 Installation

Provide step-by-step instructions on how to install and set up your application locally. For example:

1. Clone the ecommerce-backend repository:

```sh

git clone https://github.com/devofthought/travel-and-bus-management

```

2. Change to the project directory:

```sh

cd server/

```

3. Install the dependencies:

```sh

npm install

```

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add your environment variables to the `.env` file. Here's an example with placeholders:

   ```env
    PORT = 5000
    DEFAULT_ADMIN_PASSWORD=admin_default_password
    DEFAULT_DRIVER_PASSWORD=driver_default_password
    DATABASE_URL=mongodb://localhost:27017/your-database
    BCRYPT_SALT_ROUNDS=12
    JWT_SECRET=your-secret-key
    JWT_EXPIRES_IN=1d
    JWT_REFRESH_SECRET=your-refresh-secret-key
    JWT_REFRESH_EXPIRES_IN=100d
    CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
    CLOUDINARY_API_KEY=your-cloudinary-cloud-api-key
    CLOUDINARY_API_SECRET=your-cloudinary-cloud-api-secret-key
    STORE_ID=test64edb6e03ce0e
    STORE_PASSWORD=test64edb6e03ce0e@ssl
    CLIENT_URL=client-url
    SERVER_URL=server-url
    STRIPE_SECRET_KEY=your-stripe-secret-key
    NODEMAILER_EMAIL=your-nodemailer-email
    NODEMAILER_PASSWORD=your-nodemailer-password
   ```

   Replace the placeholders with your actual values.

## Scripts

- `start`: Build and start the application in production mode.
- `dev`: Start the development server with automatic restart using nodemon.
- `build`: Run tests, build TypeScript code, and generate TypeScript aliases.
- `test`: Run tests using Jest.

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): Password hashing library.
- [cors](https://www.npmjs.com/package/cors): Cross-origin resource sharing middleware.
- [dotenv](https://www.npmjs.com/package/dotenv): Environment variableList management.
- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token (JWT) library.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js.
- [nodemailer](https://www.npmjs.com/package/nodemailer): Email sending library.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): Swagger UI for API documentation.
- [yamljs](https://www.npmjs.com/package/yamljs): YAML to JSON parser.
- [zod](https://www.npmjs.com/package/zod): TypeScript-first schema validation library.

## Environment Variables

- `PORT`: The port on which the application will listen.
- `MONGO_URI`: MongoDB connection URL.
- `NODE_ENV`: Node.js environment (e.g., development, production).
- `BCRYPT_SALTROUND`: Number of bcrypt salt rounds.
- `JWT_ACCESSTOKEN_SECRET`: Secret key for JWT access tokens.
- `JWT_ACCESSTOKEN_EXP`: Expiration time for JWT access tokens.

## Deployment Instructions

To deploy your Node.js application using GitHub Actions, follow these simplified steps:

1. **Push Changes to GitHub**: Make changes to your Node.js application code as needed.

2. **Commit Changes**: Commit your changes to the `main` branch.

   ```bash
   git add .
   git commit -m "Update application code"
   ```

3. **Push to GitHub**: Push the committed changes to your GitHub repository.

   ```bash
   git push origin main
   ```

4. **GitHub Actions**: GitHub Actions will automatically trigger a workflow when changes are pushed to the `main`
   branch. This workflow performs the following tasks:

    - Builds your Node.js application.
    - Pushes a Docker image to Docker Hub.
    - Deploys the updated application to your server.

5. **Monitor Deployment**: Monitor the GitHub Actions workflow progress on your GitHub repository's Actions tab. The
   workflow will display the status of each step, including building, pushing, and deploying.

6. **Access Deployed Application**: Once the workflow is completed successfully, your Node.js application should be
   deployed and accessible. You can access it via the specified URL or domain name.

That's it! Your application is automatically deployed whenever you push changes to the `main` branch of your GitHub
repository. This streamlined process minimizes manual deployment steps for users.