export enum Paths {
  HOME = '/',
  ABOUT = '/about',
  RESUME = '/resume',

  APPLICATIONS = '/applications',
  VIEW_APPLICATION = '/applications/:appName',

  PRINTABLE_RESUME = '/printable-resume',
  // === CONTACT start ===
  CONTACT = '/contact',
  REPORT_BUG = '/contact/report-bug',
  APPLICATION_BUG = '/contact/report-bug/:appName',
  // === CONTACT end ===
  // ====== PRIVATE start ======
  PRIVATE = '/_private_',
  PRIVATE_EXPENSE = '/_private_/expense'
  // ====== PRIVATE end ======
}

export const generateDynamicPath = (basePath: keyof typeof Paths, route: string): string =>
  `${basePath}/${route}`;
