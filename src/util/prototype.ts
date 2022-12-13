String.prototype.prettyNumber = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

String.prototype.formatH1 = function () {
  let tempStr = this;
  tempStr = tempStr.toString();
  tempStr = tempStr.toLowerCase();
  tempStr = tempStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  tempStr = tempStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  tempStr = tempStr.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  tempStr = tempStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  tempStr = tempStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  tempStr = tempStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  tempStr = tempStr.replace(/đ/g, "d");
  tempStr = tempStr.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  tempStr = tempStr.replace(/ + /g, " ");
  tempStr = tempStr.replace(/\s+/g, "-");
  tempStr = tempStr.trim();
  return tempStr;
};
String.prototype.getNumberOfDayFromNow = function () {
  let tempStr = this + "";

  const tempDateCreate = new Date(tempStr).toISOString();
  const timeElapsed = Date.now();
  const tempNow = new Date(timeElapsed).toISOString();
  // const nowDate = new Date(temp);

  const dateCreate = new Date(tempDateCreate);
  const nowDate = new Date(tempNow);

  var Difference_In_Time = nowDate.getTime() - dateCreate.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  let result = Math.round(Difference_In_Days) + " s trước";
  if (Difference_In_Days < 1) {
    if (Difference_In_Time <= 1000) result = "1 giây trước";
    else if (Difference_In_Time < 1000 * 60)
      result = Math.round(Difference_In_Time / 1000) + " giây trước";
    else if (Difference_In_Time < 2 * 1000 * 60) result = "1 phút trước";
    else if (Difference_In_Time < 1000 * 60 * 60)
      result = Math.round(Difference_In_Time / 1000 / 60) + " phút trước";
    else if (Difference_In_Time <= 2 * 1000 * 60 * 60) result = "1 giờ trước";
    else
      result = Math.round(Difference_In_Time / 1000 / 60 / 60) + " giờ trước";
  } else if (Difference_In_Days < 2) result = "1 ngày trước";
  else if (Math.round(Difference_In_Days) < 31)
    result = Math.round(Difference_In_Days) + " ngày trước";
  else {
    let temp = Math.round(Difference_In_Days / 30);
    if (temp <= 1) result = "1 tháng trước";
    else if (temp <= 12) result = temp + " tháng trước";
    else {
      let tempYear = Math.round(Difference_In_Days / 365);
      if (tempYear <= 1) result = "1 năm trước";
      else result = tempYear + " năm trước";
    }
  }
  return result;
};

String.prototype.convertToDay = function () {
  let tempStr = this + "";

  const tempDateCreate = new Date(tempStr).toLocaleString();
  return tempDateCreate;
};

// Array.prototype.contains = function (obj) {
//   var i = 0;
//   for (; i < this.length; i++) {
//     if (this[i] === obj) return true;
//   }
//   return false;
// };
