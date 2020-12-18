import * as Config from "../../config.js";


function debugStr(str) {
    if(Config.IS_DEBUG) {
      console.log("%c" + str, 'background: #222; color: #bada55');
    }
  }
  
  function debugGroupCollapsed(groupTitle,items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, true);
  }
  
  function debugGroup(groupTitle, items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, false);
  }
  
  function debugGroupExpandCollapsed(groupTitle, items, isCollapsed) {
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
