async function getPriceItem(productName) {
  try {
      // Fetch the JSON data from the file
      const response = await fetch('/pages/veryrealdatabase/merch.json');
      const data = await response.json();

      // Find the product in the JSON data
      const product = data.find(item => item.name.toLowerCase() === productName.toLowerCase());

      if (product) {
          return product.price; // Return the price if found
      } else {
          console.log("Product not found");
          return null; // Return null if no product is found
      }
  } catch (error) {
      console.error("Error loading the merchandise data:", error);
      return null; // Return null in case of an error
  }
}

async function getPriceConcert(seatType) {
  try {
      const response = await fetch('/pages/veryrealdatabase/seating.json');
      const data = await response.json();

      // Find the product in the JSON data
      const product = data.find(item => item.loc.toLowerCase() === seatType.toLowerCase());

      if (product) {
          return product.price; // Return the price if found
      } else {
          console.log("Product not found");
          return null; // Return null if no product is found
      }
  } catch (error) {
      console.error("Error loading the merchandise data:", error);
      return null; // Return null if there's an error
  }
}

getPriceConcert("Club Seating").then(function(data){console.log(data)}) 
getPriceItem("Band Beanie").then(function(data){console.log(data)})

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
      isFound = false;
      for (var j=0;j<items.length();j++) {
        if (items[j]==name) {
          isFound = true;
        }
      }
      if (isFound) {

      } else {

      }
    }
  }
}

function addCookieConcert (city, loc, quanty) {

}

async function getTotPrice () {
  var keyValuePairs = document.cookie.split(";");
  totP = 0;
  for (var i=0;i<keyValuePairs.length;i++) {
    if (keyValuePairs[i].split("=")[0].trim() == "items" || keyValuePairs[i].split("=")[0].trim() == "concerts") {
      arrS = keyValuePairs[i].split("=")[1];
      arr = arrS.split(",");
      for (var j=0;j<arr.length;j++) {
        ii = arr[j];
        sep = ii.split("/");
        totP+=sep[2].trim()*sep[3].trim()
      }
    }
  }
  return totP.toFixed(2);
}