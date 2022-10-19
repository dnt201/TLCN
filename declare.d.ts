export interface String {
  prettyMoney: () => string;
}
export interface String {
  prettyNumber: () => string;
}
export interface Array<T> {
  contains: (obj: T) => boolean;
}

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Array.prototype.contains = function (obj) {
  var i = 0;
  for (; i < this.length; i++) {
    if (this[i] === obj) return true;
  }
  return false;
};
