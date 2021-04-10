"use strict";
exports.__esModule = true;
exports.handler = void 0;
var getContactTemplate = function (body) { return "\n  <div>\n      <h1>Sender Info</h1>\n      <ul>\n          <li>\n              Sender Name: " + body.name + "\n          </li>\n          <li>\n              Sender Email: " + body.email + "</div>\n          </li>\n      </ul>\n      <h2>Message:</h2>\n      <div>" + body.message + "</div>\n  </div>\n"; };
var getBugReportTemplate = function (body) { return "\n  <div>\n    <h1>Sender Info</h1>\n    <ul>\n      <li>\n        Sender Name: " + (body.name || 'N/A') + "\n      </li>\n      <li>\n        Sender Email: " + (body.email || 'N/A') + "\n      </li>\n    </ul>\n    <h2>Affected Application: " + body.appName + "</h2>\n    <h2>Message:</h2>\n    <p>" + body.message + "</p>\n  </div>\n"; };
var getExpenseReportTemplate = function (_a) {
    var category = _a.category, date = _a.date, amount = _a.amount, payee = _a.payee, memo = _a.memo, paymentType = _a.paymentType;
    return "\n  <div>\n    <h1>New Expense</h1>\n    <ul>\n      <li>Category: <b>" + category + "</b></li>\n      <li>Date: <b>" + date + "</b></li>\n      <li>Amount: <b>$" + amount + "</b></li>\n      <li>Payee: <b>" + payee + "</b></li>\n      <li>Memo: <b>" + memo + "</b></li>\n      <li>Payment Type: <b>" + paymentType + "</b></li>\n    </ul>\n  </div>\n";
};
var getImposterNotifTemplate = function (_a) {
    var secretCode = _a.secretCode, googleData = _a.googleData;
    return "\n  <div>\n    <h1 style=\"color: red;\">SOMEONE TRIED TO ACCESS PRIVATE</h1>\n    <p>They entered: <b>" + secretCode + "</b></p>\n    <div>\n      <p><b>Google Data:</b></p>\n      <p>" + JSON.stringify(googleData) + "</p>\n    </div>\n  </div>\n";
};
var getTemplate = function (body) {
    var type = body.type;
    switch (type) {
        case 'expenseReport':
            // eslint-disable-next-line @typescript-eslint/camelcase
            return getExpenseReportTemplate(body);
        case 'imposterNotif':
            // eslint-disable-next-line @typescript-eslint/camelcase
            return getImposterNotifTemplate(body);
        case 'bugReport':
            return getBugReportTemplate(body);
        case 'contact':
        default:
            return getContactTemplate(body);
    }
    ;
};
var getSubject = function (_a) {
    var type = _a.type, name = _a.name;
    switch (type) {
        case 'expenseReport':
            return 'New Expense Entry';
        case 'bugReport':
            return 'New Bug Report';
        case 'contact':
            return name + " sent you a message";
        case 'imposterNotif':
            return 'SOMEONE TRIED TO ACCESS PRIVATE';
        default:
            return 'New Message From Your Personal Site';
    }
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
        from: body.email || 'self',
        to: process.env.VUE_APP_EMAIL_TO,
        replyTo: body.email || 'N/A',
        subject: getSubject(body),
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
