import * as Config from "../../config.js";


export function debugStr(str) {
    if(Config.IS_DEBUG) {
      console.log("%c" + str, 'background: #222; color: #bada55');
    }
  }
  
export function debugGroupCollapsed(groupTitle,items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, true);
  }
  
export function debugGroup(groupTitle, items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, false);
  }
  
export function debugGroupExpandCollapsed(groupTitle, items, isCollapsed) {
    const IS_DEBUG = Config.IS_DEBUG;
    if(IS_DEBUG) {
      isCollapsed? console.groupCollapsed(groupTitle) : console.group(groupTitle);
      if (items instanceof Array) {
        items.map((items, index) => {
          if (items instanceof Object) {
            debugGroupExpandCollapsed("["+index+"] :", items, true);
          } else {
            debugStr(items)
          }
          return 0;
        });
      } else if (typeof items == 'object') {
        for (var key in items) {
          if(items[key] instanceof Object || items[key] instanceof Array) {
            debugGroupExpandCollapsed(key+ ": ", items[key], true);
          } else {
            debugStr(key+": " + items[key]);
          }
        }
      }  else if (typeof items == 'function') {
        debugStr("Function: " + (items.name || "Annonymous function"));
      } else {
        debugStr(items);
      }
      console.groupEnd();
    }
  }

  
export function error(msg, exception) {
  if (exception !== null && exception !== undefined) {
    if (exception.message !== null && exception.message !== undefined
      && exception.name !== null && exception.name !== undefined
      && exception.stack !== null && exception.stack !== undefined) {
      console.group("%c"+msg+exception.name + ": " + exception.message, "color: #ffebee, background: #c62828");
      console.error(exception.stack);
      console.groupEnd();
    } else {
      console.error(msg);
    }
  } else {
    console.error(msg);
  }
}

export function errorHandlerAPI(errorAPI, MessageHandler=()=>{}, surprressMessage=false) {
  let statusCode = 666;
  let isException = true;
  if (errorAPI.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (errorAPI.response.status == 404) {
        isException = false;
        statusCode = 404;
    } else {
        error(`${errorAPI.response.data} HTTP Code = ${errorAPI.response.status}`);
    }
  } else if (errorAPI.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error(errorAPI.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    error('Error', errorAPI.message);
  }

  if (isException && !surprressMessage) {
      // Show Modal Error to refresh page
      MessageHandler("Error Connection", "an error happened while trying to connect to remote server, please try again later");
  }
  return statusCode;
}

