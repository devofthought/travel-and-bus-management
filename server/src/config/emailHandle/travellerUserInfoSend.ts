/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer'
import config from '..'

type IMessage = {
  traveler_id: string
  password: string
  role: string
  name: string
  email: string
}

export const travelerUserInfoSendByEmail = (message: IMessage) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.nodemailer_email as string,
      pass: config.nodemailer_password as string,
    },
  })

  const messageBody = 
                    `<div>
                          <div style="padding: 0 60px; width: 100%;">
                          <h2>Hello! ${message.name},</h2>
                          <br />
                          <p>Here is your account credential of Dhruto travel</p>
                          <p style="text-align: left; margin-left: 20px">Full Name: ${message.name}</p>
                          <p style="text-align: left; margin-left: 20px">Register Email: ${message.email}</p>
                          <p style="text-align: left; margin-left: 20px">Your password: ${message.password}</p>
                          <p style="text-align: left; margin-left: 20px">Your role: ${message.role}</p>     
                          </div>
                    </div>`

  const mailOption = {
    from: 'mdkzaman2025@gmail.com',
    to: message.email,
    subject: 'Account credential of Dhruto travel',
    html: messageBody,
  }

  transporter.sendMail(
    mailOption,
    async (error: any, info: { response: string }) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent to the traveler: ' + info.response)
      }
    }
  )
}
