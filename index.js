require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        status : 'Ready',
        services :  {
            sendEmail : {
                url : "/send",
                method: "POST",
                body: {
                    mailer : {
                        host: 'host',
                        port: 'port',
                        secure: 'secure',
                        user: 'user',
                        pass: 'pass'
                    },
                    mail : {
                        from: '"John Doe 👻" <foo@example.com>',
                        to: "johndoe@example.com",
                        subject: "Hello ✔",
                        text: "Hello world?",
                        html: "<b>Hello world?</b>"
                    }
                }
            }
        }
    });
});

app.post('/send', async(req, res)  => {
    const { mailer, mail } = req.body;
    let transporter = nodemailer.createTransport({
        host: mailer.host,
        port: mailer.port,
        secure: mailer.secure,
        auth: {
            user: mailer.user,
            pass: mailer.pass
        }
    });

    let mailOptions = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        html: mail.html
    };

    try {
        let info = await transporter.sendMail(mailOptions)
        res.json({ message :  `Message sent: ${info.messageId}`})
    } catch (error) {
        res.json({error});
    }
})

app.listen(PORT, () => {
    console.log(`Running on : ${PORT}`);
});