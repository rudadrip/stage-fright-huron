(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


//Chicago Concert/Mezzanine/2/300,Pheonix Concert/Box/1/4000
//Band Hoodie/High Quality/5/10.99,Band Beanie/High Quality/8/8.99
/*
async function insertStuffs () {
  const ins = document.getElementById("insert-items");
  var keyValuePairs = document.cookie.split(";");
  for (var i=0;i<keyValuePairs.length;i++) {
    if (keyValuePairs[i].split("=")[0].trim() == "items") {
      arrS = keyValuePairs[i].split("=")[1];
      arr = arrS.split(",");
      for (var j=0;j<arr.length;j++) {
        ii = arr[j]
        sep = ii.split("/");
        let item = document.createElement('checkout-item-c');
        item.setAttribute("name", sep[0].trim());
        item.setAttribute("extra", sep[1].trim());
        item.setAttribute("qty", sep[2].trim());
        item.setAttribute("price", sep[3].trim());
        ins.insertAdjacentElement("afterend",item);
      }
    } else if (keyValuePairs[i].split("=")[0].trim() == "concerts") {
      arrS = keyValuePairs[i].split("=")[1];
      arr = arrS.split(",");
      for (var j=0;j<arr.length;j++) {
        ii = arr[j]
        sep = ii.split("/");
        let item = document.createElement('checkout-item-c');
        item.setAttribute("name", sep[0].trim());
        item.setAttribute("extra", sep[1].trim());
        item.setAttribute("qty", sep[2].trim());
        item.setAttribute("price", sep[3].trim());
        ins.insertAdjacentElement("afterend",item);
      }
    }
  }
}

async function grabNumberItems () {
  const ins = document.getElementById("num-items");
  totC = 0
  var keyValuePairs = document.cookie.split(";");
  for (var i=0;i<keyValuePairs.length;i++) {
    if (keyValuePairs[i].split("=")[0].trim() == "items" || keyValuePairs[i].split("=")[0].trim() == "concerts") {
      val = keyValuePairs[i].trim()
      for (var j=0;j<val.length;j++) {
        if (val[j] == ',') {
          totC+=1
        }
      }
      totC+=1;
    }
  }
  ins.innerHTML = `${totC}`;
}

async function insertTotPrice () {
  const ins = document.getElementById("tot-price");
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
  ins.innerHTML = `\$${totP.toFixed(2)}`;
}

insertStuffs ()
grabNumberItems()
insertTotPrice()
*/

function calculateCartTotal() {
  let total = 0;

  // Loop through each item in the cart
  cart.forEach(item => {
      let itemTotalPrice = 0;

      // If the item is a merch item
      if (item.type === 'merch') {
          itemTotalPrice = parseFloat(item.price) * item.quantity;
      }
      // If the item is a concert ticket
      else if (item.type === 'concert') {
          itemTotalPrice = parseFloat(item.price) * item.quantity;
      }

      total += itemTotalPrice;  // Add the item's total price to the overall total
  });

  return total.toFixed(2);  // Return total price rounded to two decimal places
}

function calculateSalesTax() {
  return (calculateCartTotal()*0.06).toFixed(2);
}

function calculateTotPrice () {
  return calculateCartTotal() + calculateSalesTax();
}

function calculateTotalItems() {
  let totalItems = 0;

  // Loop through each item in the cart
  cart.forEach(item => {
      totalItems += 1;
  });

  return totalItems;
}

function enterFiscalInfo () {
  const ins1 = document.getElementById("tot-price");
  ins1.innerHTML = calculateTotPrice();
  const ins2 = document.getElementById("num-items");
  ins2.innerHTML = calculateTotalItems();
}

enterFiscalInfo()