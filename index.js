require('dotenv').config();

const express = require("express");
const app = express();

const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'oauth2',
        user: process.env.EMAIL,
        clientId: process.env.ID,
        clientSecret: process.env.SECRET,
        refreshToken: process.env.RTOKEN,
        accessToken: process.env.ATOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: "salmannhassan@gmail.com",
    to: "",
    subject: "Testing Web App",
    text: ""
};

app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static("public"));
app.use(express.json({
    limit: "1mb"
}));

app.post("/form-handler", (req, res) => {
    console.log(req.body);
    const data = req.body;
    res.json({
        status: "success"
    });
    sendEmail(data);
})

function sendEmail(data) {
    mailOptions.to = `${data.email}`;
    mailOptions.text = `Thank you ${data.name} whose age is ${data.age} for participating in this form!!`;

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.error(err);
            console.log("Error Occurs");
        } else {
            console.log("Email sent!!");
        }
    });

    mailOptions.to = "";
    mailOptions.text = "";
}