async function grabOneItemPrice (name) {
    const response = await fetch ('js/allthatfunstuff.js');
    const items = await response.json();
    for (let i=0;i<items.length;i++) {
      let obj = items[i];
      let qty = await grabQuantity(name);
      if (obj.name == name) {
        return Number(obj.price*qty);
      }
    }
  }

async function deleteAllItems() {
  var keyValuePairs = document.cookie.split(";");
}

async function deleteAllConcerts () {

}


async function deleteSomething (name, type) {
  var keyValuePairs = document.cookie.split(";");
  for (var i=0;i<keyValuePairs.length;i++) {
    if (keyValuePairs[i].split("=")[0].trim() == type) {
      vals = keyValuePairs[i].split("=")[1].trim()
      i1 = vals.indexOf(name);
      i2 = vals.length;
      for (var j=i1;j<vals.length;j++) {
        if (vals[j]==',') {
          i2 = j;
        }
      }
      removal = vals.substring(i1,i2);
      var ret = vals.replace(removal,'');
      if (ret[0]==',') {
        ret=ret.slice(1);
      }
      if (ret[ret.length-1]==',') {
        ret=ret.substring(0,ret.length-1);
      }
      for (var k=1;k<ret.length;k++) {
        if (ret[k]==',' && ret[k-1]==',') {
          ret = ret.slice(0, k) + ret.slice(k + 1);
        }
      }
      console.log(ret)
      document.cookie = `${type}=${vals}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      document.cookie = `${type}=${ret}`;
    }
  }
}

async function addCookieItem (name, quant) {
  var OGkeyValuePairs = document.cookie.split(";");
  if (OGkeyValuePairs.length == 0) {
    document.cookie("items=");
  }
  var keyValuePairs = document.cookie.split(";");
  for (var i=0;i<keyValuePairs.length;i++) {
    if (keyValuePairs[i].split("=")[0].trim() == "items") {
      items = keyValuePairs[i].split("=")[1].trim().split(",");
      for (var j=0;j<items.length();j++) {
         if (items[j].split("/")[0].trim() == name) {
          a = items[j][0];
          b = items[j][1];
          c = items[j][2]+quant;
          d = items[j][3];

         }
      }
    }
  }
}

function addCookieConcert (city, loc, quanty) {

}





function calculateSubtotal () {

}