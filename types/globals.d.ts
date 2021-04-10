declare type MailerEventType =
| 'contact'
| 'bugReport'
| 'expenseReport'
| 'imposterNotif';

declare interface MailerBaseBody {
  type: MailerEventType;
}

declare interface MailerContactBody extends MailerBaseBody {
  type: 'contact' | 'bugReport';
  name: string;
  email: string;
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
}

// eslint-disable-next-line
declare interface MailerPRIVATE_ImposterBody extends MailerBaseBody {
  type: 'imposterNotif';
  secretCode: string;
}

declare type MailerBody =
| MailerContactBody
// eslint-disable-next-line
| MailerPRIVATE_ExpenseBody
// eslint-disable-next-line
| MailerPRIVATE_ImposterBody;
