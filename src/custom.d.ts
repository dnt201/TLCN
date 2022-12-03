declare interface String {
  prettyMoney: () => string;
  prettyNumber: () => string;
  formatHTML: () => string;
  formatH1: () => String;
  getNumberOfDayFromNow: () => string;
}
declare module "*.png";
declare interface Array<T> {
  contains: (obj: T) => boolean;
}
