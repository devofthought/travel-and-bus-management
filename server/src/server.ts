import mongoose from 'mongoose'
import configs from './config/index'
import app from './app'
import { Server } from 'http'
// import { dateAndTime } from './config/updateDateAndTime'

process.on('uncaughtException', error => {
  // console.log(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(configs.db_url as string)
    // console.log('Database connection on 🔥')

    server = app.listen(configs.port, () => {
      // console.log(`Server is running on port ${configs.port}`)
    })
  } catch (error) {
    // console.log('Failed to connect to database', error)
  }
  process.on('unhandledRejection', error => {
    // console.log(error)

    if (server) {
      server.close(() => {
        // console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()


// dateAndTime()

process.on('SIGTERM', () => {
  // console.log('SIGTERM is received.')
  if (server) {
    server.close()
  }
})
