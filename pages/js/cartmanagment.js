// Seating and Location Data
const seating_management = [
    { "loc": "VIP Box/Suite", "price": "3000" },
    { "loc": "Club Seating", "price": "750" },
    { "loc": "Lower Bowl", "price": "250" },
    { "loc": "Mid-Level/Mezzanine", "price": "125" },
    { "loc": "Upper Bowl", "price": "40" },
    { "loc": "Standing Room", "price": "20" }
  ];

  const locations_management = [
    { "city": "New York, NY", "loc": "Madison Square Garden", "date": "November 10, 2024", "image": "Madison_Square_Garden.jpg" },
    { "city": "Los Angeles, CA", "loc": "The Forum", "date": "November 20, 2024", "image": "The_Forum.jpg" },
    { "city": "Chicago, IL", "loc": "United Center", "date": "December 1, 2024", "image": "United_Center.jpg" },
    { "city": "Houston, TX", "loc": "Toyota Center", "date": "December 5, 2024", "image": "Toyota_Center.jpg" },
    { "city": "Dallas, TX", "loc": "American Airlines Center", "date": "December 10, 2024", "image": "American_Airlines_Center.jpg" },
    { "city": "Atlanta, GA", "loc": "State Farm Arena", "date": "December 15, 2024", "image": "State_Farm_Arena.jpg" },
    { "city": "Miami, FL", "loc": "Kaseya Center", "date": "December 20, 2024", "image": "Kaseya_Center.jpg" },
    { "city": "Orlando, FL", "loc": "Amway Center", "date": "December 22, 2024", "image": "Amway_Center.jpg" },
    { "city": "Boston, MA", "loc": "TD Garden", "date": "January 5, 2025", "image": "TD_Garden.jpg" },
    { "city": "Philadelphia, PA", "loc": "Wells Fargo Center", "date": "January 10, 2025", "image": "Wells_Fargo_Center.jpg" },
    { "city": "Washington, DC", "loc": "Capital One Arena", "date": "January 15, 2025", "image": "Capital_One_Arena.jpg" },
    { "city": "Seattle, WA", "loc": "Climate Pledge Arena", "date": "January 20, 2025", "image": "Climate_Pledge_Arena.jpg" }
  ];
  
//Merch data
  const merch_management = [
    { "name": "Band T-shirt", "desc": "Show your love for Stage Fright with this soft comfy T-shirt featuring our bold logo. Perfect for any fan!", "price": "12.99","img":"tshirt.jpg" },
    { "name": "Band Crewneck", "desc": "Stay cozy with the Stage Fright crewneck designed for comfort and style. A must-have for cooler days!", "price": "29.99","img":"crewneck.jpg" },
    { "name": "Guitar Pick", "desc": "Grab a Stage Fright guitar pick for that extra touch of rock—durable sleek and logo branded.", "price": "5.99", "img": "guitarpick.jpg" },
    { "name": "Band Beanie", "desc": "Top off your look with the Stage Fright beanie featuring our logo for a stylish warm fit.", "price": "11.99", "img":"beanie.jpg" }
  ];

  // Function to get the cart from cookies (returns parsed object or an empty array if not found)
  function getCartFromCookies() {
      let cartData = document.cookie
          .split('; ')
          .find(row => row.startsWith('cart='))
          ?.split('=')[1]; // Get the cart cookie and decode it
  
      return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
  }
  
  // Function to save the cart to cookies
  function saveCartToCookies(cart) {
      document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/;`;
  }
  
  // Initialize the cart from cookies or use an empty cart if none exists
  let cart_management = getCartFromCookies();
  
  // Add Merch Item to Cart
  function addMerchItem(name, quantity) {
      // Find the merch item details from the merch array
      const item = merch_management.find(m => m.name === name);
      
      if (!item) {
          console.error("Item not found.");
          return;
      }
  
      // Check if the item already exists in the cart
      let existingItem = cart_management.find(item => item.name === name && item.type === 'merch');
      
      if (existingItem) {
          existingItem.quantity = parseInt(quantity) + parseInt(existingItem.quantity);
      } else {
          cart_management.push({
              name: item.name,
              description: item.desc,
              quantity: quantity,
              price: Number(item.price).toLocaleString("en-US"),
              type: 'merch'
          });
      }
  
      // Save the updated cart to cookies
      saveCartToCookies(cart_management);
  }
  
  // Add Concert Ticket to Cart
  function addConcertItem(city, quantity, seatType) {
      // Find the corresponding location and seat price
      const location = locations_management.find(loc => loc.city === city);
      const seat = seating_management.find(seat => seat.loc === seatType);
  
      if (!location || !seat) {
        console.log(city, quantity, seatType)
        console.log(location,seat)
          console.error("Invalid location or seat type.");
          return;
      }
  
      let existingConcert = cart_management.find(item => item.city === city && item.seatType === seatType && item.type === 'concert');
      
      if (existingConcert) {
          existingConcert.quantity += quantity;
      } else {
          cart_management.push({
              city: city,
              loc: location.loc,
              date: location.date,
              quantity: quantity,
              seatType: seatType,
              price: Number(seat.price).toLocaleString("en-US"),
              type: 'concert'
          });
      }
  
      // Save the updated cart to cookies
      saveCartToCookies(cart_management);
  }
  
  // Delete a specific merch item from the cart
  function deleteMerchItem(name) {
      cart_management = cart_management.filter(item => item.name !== name || item.type !== 'merch');
      saveCartToCookies(cart_management);
  }
  
  // Delete a specific concert item from the cart
  function deleteConcertItem(city, seatType) {
      cart_management = cart_management.filter(item => item.city !== city || item.seatType !== seatType || item.type !== 'concert');
      saveCartToCookies(cart_management);
  }
  
  // Function to view the current cart
  function viewCart() {
      return cart_management;
  }
  /*
  function calculateCartTotal() {
    let total = 0;
  
    // Loop through each item in the cart
    cart.forEach(item => {
        console.log(`item ${item.quantity}`)
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
    console.log(total)
  
    return total.toFixed(2);  // Return total price rounded to two decimal places
  }
  */
  function calculateCartTotal() {
    // Get the cart data from the cookies
    const cartCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('cart='));

    // If the cart cookie doesn't exist, return 0
    if (!cartCookie) return 0;

    // Parse the cart data
    const cartData = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));

    // Calculate the total price
    let total = 0;
    cartData.forEach(item => {
        total += parseFloat(item.price) * parseInt(item.quantity);
    });

    // Return the total price
    return Number(total.toFixed(2)).toLocaleString("en-US");  // Returns the total with two decimal places
}
  /*
  function calculateTotalItems() {
    let totalItems = 0;
  
    // Loop through each item in the cart
    cart.forEach(item => {
        totalItems += 1;
    });
  
    return totalItems;
  }*/
    function calculateTotalItems() {
        // Get the cart data from the cookies
        const cartCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('cart='));
    
        // If the cart cookie doesn't exist, return 0
        if (!cartCookie) return 0;
    
        // Parse the cart data
        const cartData = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));
    
        // Return the number of unique items in the cart (i.e., the length of the array)
        return cartData.length;
    }


document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const totalItemsElement = document.getElementById("total-items");
  
    // Populate the cart
    function renderCart() {
      const cart = getCartFromCookies(); // Retrieve cart from cookies
      cartItemsContainer.innerHTML = ""; // Clear previous items
  
      // Loop through items in the cart
      cart.forEach((item, index) => {
        const row = document.createElement("tr");

        console.log(item)
        const imgCell = document.createElement("td");
        if (item.type == "concert") {
            var insertImg = 0
            for (var i=0;i<locations_management.length;i++) {
                if (locations_management[i].city == item.city) {
                    insertImg = locations_management[i].image;
                }
            }
            imgCell.innerHTML = `<img src="../assets/locations/${insertImg}" alt="${item.city}" class="img-fluid">`;
        } else if (item.type == "merch") {
            var insertImg = 0
            for (var i=0;i<merch_management.length;i++) {
                if (merch_management[i].name == item.name) {
                    insertImg = merch_management[i].img;
                }
            }
            imgCell.innerHTML = `<img src="../assets/merch-img/${insertImg}" alt="${item.name}" class="img-fluid">`;
        }
  
        const infoCell = document.createElement("td");
        var insertName = 0
        if (item.type == "merch") {
            insertName = item.name;
        } else if (item.type == "concert") {
            insertName = `${item.city} Concert`;
        }
        infoCell.innerHTML = `
          <p>${insertName}</p>
          <p class="py-2">$${Number(item.price).toLocaleString("en-US")}</p>
        `;
  
        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
          <div class="input-group">
            <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
            <input style="input::placeholder{color: #fff;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}input[type=number] {-moz-appearance: textfield;}" type="number" class="form-control text-center text-white no-arrows" min="1" value="${item.quantity}">
            <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
          <p class="text-center py-1 text-danger" onclick="removeItem(${index})" style="cursor: pointer;">Remove</p>
        `;
  
        row.appendChild(imgCell);
        row.appendChild(infoCell);
        row.appendChild(actionCell);
  
        cartItemsContainer.appendChild(row);

        
      });
  
      // Update total price and items
      console.log(`total price ${calculateCartTotal()}`)
        totalPriceElement.innerHTML = `$${calculateCartTotal()}`;
        //totalItemsElement.textContent = calculateTotalItems();
    }
  
    // Change quantity
    window.changeQuantity = (index, delta) => {
        console.log("change quantity")
      const cart = getCartFromCookies();
      if (delta == "-1") {
        cart[index].quantity = (parseInt(cart[index].quantity) - 1).toString();
      } else {
        cart[index].quantity = (parseInt(cart[index].quantity) + 1).toString();
      }
      
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove if quantity is 0
      }
      saveCartToCookies(cart);
      renderCart();
    };
  
    // Remove item
    window.removeItem = (index) => {
      const cart = getCartFromCookies();
      cart.splice(index, 1); // Remove the item from the cart
      saveCartToCookies(cart);
      renderCart();
    };
  
    // Initialize the cart
    renderCart();
  });