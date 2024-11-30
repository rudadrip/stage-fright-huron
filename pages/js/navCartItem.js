class navCartItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallBack () {
        this.render();

        const item = this.getAttribute('item');
        item = item.trim().split("-");
        
    }
    render() {
        this.innerHTML = 
`
<tr>
    <td><img src="../assets/merch-img/beanie.jpg" alt="" srcset="" class="img-fluid"></td>
    <td>
    <p>Band Beanie</p>
    <p class="py-2">$5.99</p>
    <p></p>
    </td>
    <td>
    <div class="input-group">
        <button class="btn btn-outline-secondary" type="button" id="button-minus">-</button>
        <input type="number" class="form-control text-center" id="number-input" min="1" max="9" value="1">
        <button class="btn btn-outline-secondary" type="button" id="button-plus">+</button>
    </div>
    <style>
        /* Increase input width and hide native increment/decrement buttons */
        #number-input {
        -moz-appearance: textfield; /* Hide increment/decrement buttons in Firefox */
        }
        #number-input::-webkit-outer-spin-button,
        #number-input::-webkit-inner-spin-button {
        -webkit-appearance: none; /* Hide increment/decrement buttons in Webkit browsers */
        margin: 0; /* Remove margin for alignment */
        }
    </style>
    <script>
        // JavaScript to handle button clicks
        const input = document.getElementById('number-input');
        const buttonMinus = document.getElementById('button-minus');
        const buttonPlus = document.getElementById('button-plus');
    
        buttonMinus.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        if (value > parseInt(input.min, 10)) {
            input.value = value - 1;
        }
        });
    
        buttonPlus.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        if (value < parseInt(input.max, 10)) {
            input.value = value + 1;
        }
        });
    </script>            
    <p class="text-center py-1">Remove</p>
    </td>
</tr>
`
    }
}

customElements.define("nav-cart-item", navCartItem );