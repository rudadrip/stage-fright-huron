```
type: TICKET or ITEM
name: NAME
city: CITY NAME
loc: LOCATION or None
quant: QUANTITY
```

```
ITEM: {name};{quant}
CONCERT: {city};{loc};{quant}
```

function addCookieItem (name, quant) {

}

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

function addCookieConcert (city, loc, quanty) {

}

function deleteCookie () {

}

function changeQuant (type, name, quant) {

}

function calculateSubtotal () {

}

function calcSalesTax (subtotal) {

}

function calcTotPrice (sub, tax) {
    
}