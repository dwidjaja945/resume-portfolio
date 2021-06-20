declare type MailerEventType =
| 'contact'
| 'bugReport'
| 'expenseReport'
| 'imposterNotif';

declare interface MailerBaseBody {
  type: MailerEventType;
  name?: string;
  email?: string;
}

declare interface MailerContactBody extends MailerBaseBody {
  type: 'contact' | 'bugReport';
  message: string;
  appName?: string;
}

// eslint-disable-next-line
declare interface MailerPRIVATE_ExpenseBody extends MailerBaseBody {
  type: 'expenseReport';
  category: string;
  date: string;
  amount: string;
  payee: string;
  memo: string;
  paymentType: string;
  submittedBy: string;
}

// eslint-disable-next-line
declare interface MailerPRIVATE_ImposterBody extends MailerBaseBody {
  type: 'imposterNotif';
  secretCode?: string;
  googleData?: any;
}

declare type MailerBody =
| MailerContactBody
// eslint-disable-next-line
| MailerPRIVATE_ExpenseBody
// eslint-disable-next-line
| MailerPRIVATE_ImposterBody;

declare type Today = {
  year: string;
  month: string;
  day: string;
  today: string;
};
