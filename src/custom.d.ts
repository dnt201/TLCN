declare interface String {
  prettyMoney: () => string;
  prettyNumber: () => string;
}
declare interface Array<T> {
  contains: (obj: T) => boolean;
}
