const utils = {
  _stringToArray(string) {
    // 用于判断emoji的正则们
    var rsAstralRange = "\\ud800-\\udfff";
    var rsZWJ = "\\u200d";
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange =
      rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var reHasUnicode = RegExp(
      "[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"
    );

    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsCombo = "[" + rsComboRange + "]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var reOptMod = rsModifier + "?";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsOptJoin =
      "(?:" +
      rsZWJ +
      "(?:" +
      [rsNonAstral, rsRegional, rsSurrPair].join("|") +
      ")" +
      rsOptVar +
      reOptMod +
      ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol =
      "(?:" +
      [
        rsNonAstral + rsCombo + "?",
        rsCombo,
        rsRegional,
        rsSurrPair,
        rsAstral,
      ].join("|") +
      ")";
    var reUnicode = RegExp(
      rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq,
      "g"
    );

    var hasUnicode = function (val) {
      return reHasUnicode.test(val);
    };

    var unicodeToArray = function (val) {
      return val.match(reUnicode) || [];
    };

    var asciiToArray = function (val) {
      val = val + "";
      return val.split("");
    };

    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  },

  formAddress(name) {
    let limit = 4;
    var nameArray = this._stringToArray(name);
    var fStr;
    var str = "";
    var length = nameArray.length;
    fStr =
      "" +
      nameArray[0] +
      nameArray[1] +
      nameArray[2] +
      nameArray[3] +
      nameArray[4];
    if (length > limit) {
      for (let i = 0; i < length; i++) {
        if (i >= length - limit) {
          str += nameArray[i];
        }
      }
      str = fStr + "..." + str;
    } else {
      str = name;
    }
    return str;
  },

  /**
   * 小数不够，用0补足
   * @param {*} number
   * @param {*} bitNum 生成的小数位数
   */
  changeDecimalBuZero(number, bitNum) {
    let nf = parseFloat(number);
    if (isNaN(nf)) {
      return 0;
    }
    let sx = number.toString();
    let list = sx.split(".");
    let nfs = "";
    let nss = "";
    if (!list[1]) {
      list[1] = "";
    }
    nfs = list[0] + ".";
    for (let i = 0; i < bitNum; i++) {
      nss += list[1][i] ? list[1][i] : "0";
    }
    let sss = nfs + nss;
    return sss;
  },

  /**
   * 金额
   */
  // 金额添加千分位
  comdify(n) {
    if (!n) return n;
    if (n > 9007199254740991) {
      return "9,007,199,254,740,991";
    }
    let str = n.split(".");
    str[0] = str[0].replace(/[^\d]/g, "");
    let re = /\d{1,3}(?=(\d{3})+$)/g;
    let n1 = str[0].replace(re, "$&,");
    let money = n1;
    if (str[1] != undefined) {
      str[1] = str[1].replace(/[^\d]/g, "");
      money = money + "." + str[1];
    }
    return money.replace(/(?<=\.[0-9]{4})\d+/, "");
  },
  //去除千分位中的‘，'
  delcommafy(num) {
    if (!num) return num;
    num = num.toString();
    num = num.replace(/,/gi, "");
    return num;
  },

  // 获取输入框的值
  getInputValue(inputVal) {
    return this.comdify(this.delcommafy(inputVal));
  },

  // 是否为json
  isJson(str) {
    if (typeof str == "string") {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log("error：" + str + "!!!" + e);
        return false;
      }
    } else {
    }
    console.log("It is not a string!");
    return false;
  },

  //获取url上参数
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null) context = decodeURIComponent(r[2]);
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined"
      ? ""
      : context;
  },

  //时间转换
  getTimes(t) {
    let h = parseInt(t / 60 / 60);
    let m = parseInt((t / 60) % 60);
    let s = parseInt(t % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `${h}h ${m}m ${s}s`;
  },
};
export default utils;
