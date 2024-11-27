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

async function insertStuffs () {
  const ins = document.getElementById("insert-items");
  var keyValuePairs = document.cookie.split(";");
  for (var i=0;i<keyValuePairs.length;i++) {
    console.log("hello");
    if (keyValuePairs[i].split("=")[0].trim() == "items") {
      arrS = keyValuePairs[i].split("=")[1];
      console.log(arrS);
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
      console.log(arrS);
    } else if (keyValuePairs[i].split("=")[0].trim() == "concerts") {
      arrS = keyValuePairs[i].split("=")[1];
      console.log(arrS);
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
      console.log(arrS);
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
      console.log(`val: ${val}`)
      for (var j=0;j<val.length;j++) {
        if (val[j] == ',') {
          totC+=1
        }
      }
      totC+=1;
    }
  }
  console.log(totC);
  ins.innerHTML = `${totC}`
}

insertStuffs ()
grabNumberItems()