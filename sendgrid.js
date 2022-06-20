const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const server = process.env.SERVER_LINK;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const emailConfig = (email, verificationToken) => {
  return {
    to: `${email}`,
    from: "antoninablack666@wp.pl",
    subject: "SG Verification Email",
    text: `To verify your account please click the following link: ${server}${verificationToken}`,
    html: `<body>
    <p>To verify your account please click the following link: ${server}${verificationToken}</p>
    </body>`,
  };
};



const sendMail = (email, verificationToken) => {
  return new Promise((resolve, reject) => {
    sgMail
      .send(emailConfig(email, verificationToken))
      .then(() => {
        resolve("Verification email sent");
      })
      .catch((err) => {
        reject(err);
      });
  })
}

module.exports = { sendMail };
