// Seating and Location Data
const seating = [
  { "loc": "VIP Box/Suite", "price": "3000" },
  { "loc": "Club Seating", "price": "750" },
  { "loc": "Lower Bowl", "price": "250" },
  { "loc": "Mid-Level/Mezzanine", "price": "125" },
  { "loc": "Upper Bowl", "price": "40" },
  { "loc": "Standing Room", "price": "20" }
];

const locations = [
  { "city": "New York, NY", "loc": "Madison Square Garden", "date": "November 10, 2024", "image": null },
  { "city": "Los Angeles, CA", "loc": "The Forum", "date": "November 20, 2024", "image": null },
  { "city": "Chicago, IL", "loc": "United Center", "date": "December 1, 2024", "image": null },
  { "city": "Houston, TX", "loc": "Toyota Center", "date": "December 5, 2024", "image": null },
  { "city": "Dallas, TX", "loc": "American Airlines Center", "date": "December 10, 2024", "image": null },
  { "city": "Atlanta, GA", "loc": "State Farm Arena", "date": "December 15, 2024", "image": null },
  { "city": "Miami, FL", "loc": "Kaseya Center", "date": "December 20, 2024", "image": null },
  { "city": "Orlando, FL", "loc": "Amway Center", "date": "December 22, 2024", "image": null },
  { "city": "Boston, MA", "loc": "TD Garden", "date": "January 5, 2025", "image": null },
  { "city": "Philadelphia, PA", "loc": "Wells Fargo Center", "date": "January 10, 2025", "image": null },
  { "city": "Washington, DC", "loc": "Capital One Arena", "date": "January 15, 2025", "image": null },
  { "city": "Seattle, WA", "loc": "Climate Pledge Arena", "date": "January 20, 2025", "image": null }
];

// Merchandise Data
const merch = [
  { "name": "Band T-shirt", "desc": "Show your love for Stage Fright with this soft comfy T-shirt featuring our bold logo. Perfect for any fan!", "price": "12.99" },
  { "name": "Band Crewneck", "desc": "Stay cozy with the Stage Fright crewneck designed for comfort and style. A must-have for cooler days!", "price": "29.99" },
  { "name": "Guitar Pick", "desc": "Grab a Stage Fright guitar pick for that extra touch of rock—durable sleek and logo branded.", "price": "5.99" },
  { "name": "Band Beanie", "desc": "Top off your look with the Stage Fright beanie featuring our logo for a stylish warm fit.", "price": "11.99" }
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
let cart = getCartFromCookies();

// Add Merch Item to Cart
function addMerchItem(name, quantity) {
    // Find the merch item details from the merch array
    const item = merch.find(m => m.name === name);
    
    if (!item) {
        console.error("Item not found.");
        return;
    }

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === name && item.type === 'merch');
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: item.name,
            description: item.desc,
            quantity: quantity,
            price: item.price,
            type: 'merch'
        });
    }

    // Save the updated cart to cookies
    saveCartToCookies(cart);
}

// Add Concert Ticket to Cart
function addConcertItem(city, quantity, seatType) {
    // Find the corresponding location and seat price
    const location = locations.find(loc => loc.city === city);
    const seat = seating.find(seat => seat.loc === seatType);

    if (!location || !seat) {
        console.error("Invalid location or seat type.");
        return;
    }

    let existingConcert = cart.find(item => item.city === city && item.seatType === seatType && item.type === 'concert');
    
    if (existingConcert) {
        existingConcert.quantity += quantity;
    } else {
        cart.push({
            city: city,
            loc: location.loc,
            date: location.date,
            quantity: quantity,
            seatType: seatType,
            price: seat.price,
            type: 'concert'
        });
    }

    // Save the updated cart to cookies
    saveCartToCookies(cart);
}

// Delete a specific merch item from the cart
function deleteMerchItem(name) {
    cart = cart.filter(item => item.name !== name || item.type !== 'merch');
    saveCartToCookies(cart);
}

// Delete a specific concert item from the cart
function deleteConcertItem(city, seatType) {
    cart = cart.filter(item => item.city !== city || item.seatType !== seatType || item.type !== 'concert');
    saveCartToCookies(cart);
}

// Function to view the current cart
function viewCart() {
    return cart;
}

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
  return (parseFloat(calculateCartTotal()) + parseFloat(calculateSalesTax())).toFixed(2);
}

function calculateTotalItems() {
  let totalItems = 0;

  // Loop through each item in the cart
  cart.forEach(item => {
      totalItems += 1;
  });

  return totalItems;
}


async function insertStuffs() {
  const ins = document.getElementById("insert-items");
  var keyValuePairs = document.cookie.split(";");

  // Loop through all cookies
  for (var i = 0; i < keyValuePairs.length; i++) {
    let cookiePair = keyValuePairs[i].split("=");
    let key = cookiePair[0].trim();
    console.log(key)

    // Process items if the cookie is 'items' (for merch items and concerts)
    if (key === "cart") {
      console.log("Processing 'cart' cookie...");

      let arrS = decodeURIComponent(cookiePair[1]);  // Decode the cookie value

      try {
        // Parse the cookie value into an array of objects
        let arr = JSON.parse(arrS);
        arr.forEach(item => {
          // Check if the item is merch or a concert and create the appropriate element
          if (item.type === "merch") {
            console.log("Inserting merch item...");
            let itemElement = document.createElement('checkout-item-c');
            itemElement.setAttribute("name", item.name);
            itemElement.setAttribute("extra", item.description);  // Description for merch
            itemElement.setAttribute("qty", item.quantity);  // Quantity
            itemElement.setAttribute("price", item.price);  // Price for the merch item
            ins.appendChild(itemElement);  // Append it to the container
          } else if (item.type === "concert") {
            console.log("Inserting concert item...");
            let concertElement = document.createElement('checkout-item-c');
            let concertDetails = `${item.loc}, ${item.date}, ${item.seatType}`;
            concertElement.setAttribute("name", `${item.city} Concert`);  // Concert city
            concertElement.setAttribute("extra", concertDetails);  // Details for concert
            concertElement.setAttribute("qty", item.quantity);  // Concert quantity
            concertElement.setAttribute("price", item.price);  // Price for the seat type
            ins.appendChild(concertElement);  // Append it to the container
          }
        });
      } catch (e) {
        console.error("Error parsing 'items' cookie:", e);
      }
    }
  }
}

function enterFiscalInfo () {
  const ins1 = document.getElementById("tot-price");
  ins1.innerHTML = `$${calculateTotPrice()}`;
  const ins2 = document.getElementById("num-items");
  ins2.innerHTML = calculateTotalItems();
  insertStuffs();
}

// Example Usage:

// Example Usage:
// Adding Merchandise Items
addMerchItem('Band T-shirt', 3);  // Add 2 T-shirts to the cart
console.log("#1")
console.log(viewCart());
addMerchItem('Band T-shirt', 9);  // Add 2 T-shirts to the cart
console.log("#2")
console.log(viewCart());
addMerchItem('Band Beanie', 1);   // Add 1 Beanie to the cart

// Adding Concert Tickets
addConcertItem('New York, NY', 1, 'VIP Box/Suite');
addConcertItem('Los Angeles, CA', 2, 'Lower Bowl');

// Viewing the Cart
console.log("#3")
console.log(viewCart());

// Deleting an item from the cart
deleteMerchItem('Band T-shirt');
deleteConcertItem('Los Angeles, CA', 'Lower Bowl');

// Viewing the Cart after DeEletion
console.log("view cart")
console.log(viewCart());

console.log("Total Cart Price: $" + calculateCartTotal());
