class checkoutitemC extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback(){
      this.render();
      let itemName;

      if (this.getAttribute("type") === "merch"){
        itemName = `${this.getAttribute('name')}, ${this.getAttribute("size")}`;
      } else {
        itemName = this.getAttribute("name");
      }
      this.querySelector("#nameX").innerHTML=`${itemName}`;

      const extraInfo = this.getAttribute('extra');
      this.querySelector("#extraX").innerHTML = `${extraInfo}`
      
      const qty = this.getAttribute('qty');
      this.querySelector("#qtyX").innerHTML=`Qty: ${qty}`;

      const price = this.getAttribute('price');
      this.querySelector("#priceX").innerHTML=`$${Number(Math.abs(parseFloat(price) * parseFloat(qty) ).toFixed(2)).toLocaleString("en-US")}`;
      
    }
    render(){
      this.innerHTML=`
        <li class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0 py-1" id="nameX"></h6>
            <small class="text-muted" id="extraX"></small>
            <br>
            <small class="text-muted" id="qtyX"></small>
          </div>
          <span class="text-muted" id="priceX"></span>
        </li>`
    }
  }
  
  customElements.define("checkout-item-c", checkoutitemC );