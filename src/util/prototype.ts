String.prototype.prettyNumber = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

String.prototype.prettyMoney = function () {
  let tempSTR = this;
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Array.prototype.contains = function (obj) {
//   var i = 0;
//   for (; i < this.length; i++) {
//     if (this[i] === obj) return true;
//   }
//   return false;
// };
