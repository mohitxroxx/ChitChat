const nodemailer=require('nodemailer')
const dotenv=require('dotenv')

dotenv.config();

const {SMTP_EMAIL,SMTP_PASS}=process.env

let transporter=nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASS,
    },
})

module.exports = {
  sendmail: async function (user, res) {
      const {email} = user;
      const mailOptions = {
          from: SMTP_EMAIL,
          to: email,
          subject: "Welcome To Chit-Chat",
          html: `<body>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7;">
              <table role="presentation" cellspacing="0" cellpadding="0"  width="600"
                  style="margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);">
                  <tr>
                      <td>
                          <h3 style="color: #0838bc; font-size: 24px; text-align: center; margin-bottom: 10px;">Helllooo</h3>
                          <hr style="border: 1px solid #ccc; margin: 20px 0;">
                          <h4 style="font-size: 20px; color: #333;">Hi there,</h4>
                          <p style="font-size: 16px; color: #333; margin: 20px 0;">We welcome you to out chatting platform you can enjoy chatting with others hehe.</p>
                          <p style="font-size: 16px; color: #333;">Hasta la vista, baby.</p>
                          <div style="font-size: 16px; color: #333; margin-top: 20px; text-align: center;">
                              <h5 style="font-size: 18px;">Best Regards</h5>
                              <h5 style="font-size: 18px;">Team Chit-Chat</h5>
                          </div>
                      </td>
                  </tr>
              </table>
          </body>
      </body>`, 
      }
              transporter
                  .sendMail(mailOptions)
                  .then(() => {
                      console.log("mail sent to the user")
                  })
                  .catch((err) => {
                      console.log(err);
                  })
          }
  }