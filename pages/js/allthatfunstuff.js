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

function addCookieItem(name, quantityAdded) {
  // Define the key for the items cookie
  const itemKey = "items";

  // Retrieve the current cookie string for items
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(row => row.startsWith(`${itemKey}=`));
  let items = cookie ? cookie.split("=")[1] : ""; // Do not decode

  // Split the cookie string into individual items
  let itemList = items ? items.split(",") : [];
  let updated = false;

  // Process each item
  itemList = itemList.map(item => {
      const [itemName, description, quantity, price] = item.split("/");

      // If the item matches, update its quantity
      if (itemName === name) {
          updated = true;
          const newQuantity = parseInt(quantity) + quantityAdded;
          return `${itemName}/${description}/${newQuantity}/${price}`;
      }

      // Return unchanged if it doesn't match
      return item;
  });

  // If no matching item, log a message
  if (!updated) {
      console.log("Item not found in cookie, no changes made.");
      return;
  }

  // Clear the old cookie
  document.cookie = `${itemKey}=${cookie.split("=")[1].trim()}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  // Update the cookie string
  const updatedCookie = itemList.join(",");
  document.cookie = `${itemKey}=${updatedCookie}; path=/`;
  console.log("Updated cookie:", document.cookie);
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