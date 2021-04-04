"use strict";
exports.__esModule = true;
var getContactTemplate = function (body) { return "\n  <div>\n      <h1>Sender Info</h1>\n      <ul>\n          <li>\n              Sender Name: " + body.name + "\n          </li>\n          <li>\n              Sender Email: " + body.email + "</div>\n          </li>\n      </ul>\n      <h2>Message:</h2>\n      <div>" + body.message + "</div>\n  </div>\n"; };
var getTemplate = function (body) {
    var type = body.type;
    switch (type) {
        case 'bugReport':
            return '';
        case 'contact':
        default:
            return getContactTemplate(body);
    }
    ;
};
exports.handler = function (event, context, callback) {
    // eslint-disable-next-line
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: process.env.VUE_APP_CLIENT_ID,
            clientSecret: process.env.VUE_APP_CLIENT_SECRET
        }
    });
    var body = JSON.parse(event.body);
    var html = getTemplate(body);
    var mailOptions = {
        from: body.email,
        to: process.env.VUE_APP_EMAIL_TO,
        replyTo: body.email,
        subject: "New Website Message from " + body.name,
        text: null,
        html: html,
        auth: {
            user: 'dylanwidjajaserver@gmail.com',
            refreshToken: process.env.VUE_APP_REFRESH_TOKEN
        }
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error:', error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(info.response)
            });
        }
    });
};
