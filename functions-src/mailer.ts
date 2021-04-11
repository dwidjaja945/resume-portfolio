const getContactTemplate = (body: MailerContactBody): string => `
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

const getBugReportTemplate = (body: MailerContactBody): string => `
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

const getExpenseReportTemplate = ({
  category,
  date,
  amount,
  payee,
  memo,
  paymentType,
  submittedBy,
  // eslint-disable-next-line @typescript-eslint/camelcase
}: MailerPRIVATE_ExpenseBody): string => `
  <div>
    <h1>New Expense</h1>
    <ul>
      <li>Category: <b>${category}</b></li>
      <li>Date: <b>${date}</b></li>
      <li>Amount: <b>$${amount}</b></li>
      <li>Payee: <b>${payee}</b></li>
      <li>Memo: <b>${memo}</b></li>
      <li>Payment Type: <b>${paymentType}</b></li>
    </ul>
    <p>Submitted by: ${submittedBy}</p>
  </div>
`;

const getImposterNotifTemplate = ({
  secretCode,
  googleData,
  // eslint-disable-next-line @typescript-eslint/camelcase
}: MailerPRIVATE_ImposterBody): string => `
  <div>
    <h1 style="color: red;">SOMEONE TRIED TO ACCESS PRIVATE</h1>
    <p>They entered: <b>${secretCode}</b></p>
    <div>
      <p><b>Google Data:</b></p>
      <p>${JSON.stringify(googleData)}</p>
    </div>
  </div>
`;

const getTemplate = (body: MailerBody): string => {
  const {
    type,
  } = body;
  switch (type) {
  case 'expenseReport':
    // eslint-disable-next-line @typescript-eslint/camelcase
    return getExpenseReportTemplate(body as MailerPRIVATE_ExpenseBody);
  case 'imposterNotif':
    // eslint-disable-next-line @typescript-eslint/camelcase
    return getImposterNotifTemplate(body as MailerPRIVATE_ImposterBody);
  case 'bugReport':
    return getBugReportTemplate(body as MailerContactBody);
  case 'contact':
  default:
    return getContactTemplate(body as MailerContactBody);
  };
};

const getSubject = ({ type, name }: MailerBody): string => {
  switch (type) {
  case 'expenseReport':
    return 'New Expense Entry';
  case 'bugReport':
    return 'New Bug Report';
  case 'contact':
    return `${name} sent you a message`;
  case 'imposterNotif':
    return 'SOMEONE TRIED TO ACCESS PRIVATE';
  default:
    return 'New Message From Your Personal Site';
  }
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
    from: body.email || 'self',
    to: process.env.VUE_APP_EMAIL_TO,
    replyTo: body.email || 'N/A',
    subject: getSubject(body),
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
