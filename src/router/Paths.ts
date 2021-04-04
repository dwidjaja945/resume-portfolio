export enum Paths {
  HOME = '/',
  ABOUT = '/about',
  RESUME = '/resume',
  PRINTABLE_RESUME = '/printable-resume',
  CONTACT = '/contact',
  REPORT_BUG = '/contact/report-bug',
  APPLICATION_BUG = '/contact/report-bug/:appName'
}

export const generateDynamicPath = (basePath: keyof typeof Paths, route: string): string =>
  `${basePath}/${route}`;
