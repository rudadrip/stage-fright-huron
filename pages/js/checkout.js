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
        console.log("turkey");
        arrS = keyValuePairs[i].split("=")[1];
        console.log(arrS);
        arr = arrS.split(",");
        for (var j=0;j<arr.length;j++) {
          ii = arr[j]
          sep = ii.split("/");
          let item = document.createElement('checkout-item-c');
          item.setAttribute("name", sep[0]);
          item.setAttribute("extra", sep[1]);
          item.setAttribute("qty", sep[2]);
          item.setAttribute("price", sep[3]);
          ins.insertAdjacentElement("afterend",item);
        }
        console.log(arrS);
      }
    }
  }

insertStuffs ()