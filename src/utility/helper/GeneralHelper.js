
export function isNullOrEmpty(str) {
    if (str === undefined || str == "undefined") {
      return true;
    } 
    if (str == null) {
      return true;
    }
    if (str == "") {
      return true;
    }
    if (str == "null") {
      return true;
    }
    return false;
  };
  
export function isNullOrUndefined(obj) {
    if (obj === undefined || obj == "undefined") {
      return true;
    }
    if (obj == null) {
      return true;
    }
    if (obj == "null") {
      return true;
    }
    return false;
  }
  
export function normalizeString(str) {
    return isNullOrEmpty(str)?"":str;
  }