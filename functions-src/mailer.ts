type EventType = 'contact' | 'bugReport';

interface MailerBody {
  type: EventType;
  name: string;
  email: string;
  message: string;
  appName?: string;
}

const getContactTemplate = (body: MailerBody): string => `
  <div>
      <h1>Sender Info</h1>
      <ul>
          <li>
              Sender Name: ${body.name}
          </li>
          <li>
              Sender Email: ${body.email}</div>
          </li>
      </ul>
      <h2>Message:</h2>
      <div>${body.message}</div>
  </div>
`;

const getBugReportTemplate = (body: MailerBody): string => `
  <div>
    <h1>Sender Info</h1>
    <ul>
      <li>
        Sender Name: ${body.name || 'N/A'}
      </li>
      <li>
        Sender Email: ${body.email || 'N/A'}
      </li>
    </ul>
    <h2>Affected Application: ${body.appName}</h2>
    <h2>Message:</h2>
    <p>${body.message}</p>
  </div>
`;

const getTemplate = (body: MailerBody): string => {
  const {
    type,
  } = body;
  switch (type) {
  case 'bugReport':
    return getBugReportTemplate(body);
  case 'contact':
  default:
    return getContactTemplate(body);
  };
};

export const handler = (event, context, callback) => {
  // eslint-disable-next-line
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
    },
  });
  const body: MailerBody = JSON.parse(event.body);
  const html = getTemplate(body);
  const mailOptions = {
    from: body.email,
    to: process.env.VUE_APP_EMAIL_TO,
    replyTo: body.email,
    subject: `New Website Message from ${body.name}`,
    text: null,
    html,
    auth: {
      user: 'dylanwidjajaserver@gmail.com',
      refreshToken: process.env.VUE_APP_REFRESH_TOKEN,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error:', error);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(info.response),
      });
    }
  });
};
