declare interface String {
  prettyMoney: () => string;
  prettyNumber: () => string;
  formatHTML: () => string;
}
declare module "*.png";
declare interface Array<T> {
  contains: (obj: T) => boolean;
}
