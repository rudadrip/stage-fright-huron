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

// Music Data
const albums = [
  {
      "name": "Diamond Eyes",
      "desc": "Diamond Eyes by Stage Fright is a powerful mix of raw emotion and electrifying rock. The album blends gripping guitar riffs with melodic vocals to tell stories of resilience, vulnerability, and life's ups and downs. With its mix of high-energy anthems and heartfelt ballads, Diamond Eyes is a sparkling gem that leaves a lasting impact.",
      "image": "/assets/diamond-eyes.jpg"
  }, {
      "name": "Walk",
      "desc": "Walk by Stage Fright invites listeners to embark on a deeply personal and transformative musical journey. Each song feels like a step forward, exploring themes of courage, healing, and self-discovery. With its soulful melodies and dynamic energy, Walk captures the spirit of pushing through challenges and finding your path, making it a soundtrack for life’s most meaningful strides.",
      "image": "/assets/Walk.webp"
  }, {
      "name": "Get Dirty",
      "desc": "Get Dirty by Stage Fright is an unapologetic, high-octane dive into the raw and unfiltered sides of life. Packed with thunderous riffs, fiery vocals, and fearless energy, the album embraces chaos, passion, and rebellion. Get Dirty is a celebration of living untamed and embracing the messy, beautiful imperfections that define us.",
      "image": "/assets/get-dirty.webp"
  }
]

const music_formats = [
  {
      "type": "Digital",
      "price": "29.99"
  }, {
      "type": "Vinyl",
      "price": "44.99"
  }, {
      "type": "Digital & Vinyl",
      "price": "69.99"
  }
]

//promo code multiplier
var discount = 1;

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
        existingItem.quantity = parseInt(quantity) + parseInt(existingItem.quantity);
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
    console.log(city);
    const location = locations.find(loc => loc.city === city);
    const seat = seating.find(seat => seat.loc === seatType);

    if (!location || !seat) {
      console.log(city, quantity, seatType)
      console.log(location,seat)
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

function addMusicItem(album, type, quant){
  const music = albums.find(mus => mus.name === album);
  const medium = music_formats.find(form => form.type === type);
  if (!music || !medium) {
    console.log(album, type, quant);
    console.log(music, medium);
    console.error("Invalid music type or album name");
    return;
  }
  let existingAlbum = cart.find(item => item.name === album && item.FormatType === type && item.type === "music");
  if (existingAlbum) {
    existingAlbum.quantity += quantity;
  } else {
    cart.push({
      name: album,
      formatType: type,
      quantity: quant,
      price: medium.price,
      type: "music"
    })
  }

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

function deleteMusicItem(name, type) {
  cart = cart.filter(item => item.name !== name || item.formatType !== type || item.type !== "music");
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
      itemTotalPrice = parseFloat(item.price) * item.quantity;
      total += itemTotalPrice;
  });

  return total.toFixed(2);  // Return total price rounded to two decimal places
}

function calculateSalesTax() {
  return (calculateCartTotal()*0.06).toFixed(2);
}

function calculateTotPrice (i = false) {
  console.log(Number((parseFloat(calculateCartTotal()) + parseFloat(calculateSalesTax())).toFixed(2)).toLocaleString("en-US"));
  if (!i){
    return Number(((parseFloat(calculateCartTotal()) + parseFloat(calculateSalesTax())) * parseFloat(discount)).toFixed(2)).toLocaleString("en-US");
  } else {
    return parseFloat(calculateCartTotal()) + parseFloat(calculateSalesTax());
  }
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

    // Process items if the cookie is 'items' (for merch items and concerts)
    if (key === "cart") {

      let arrS = decodeURIComponent(cookiePair[1]);  // Decode the cookie value

      try {
        // Parse the cookie value into an array of objects
        let arr = JSON.parse(arrS);
        arr.forEach(item => {
          // Check if the item is merch or a concert and create the appropriate element
          if (item.type === "merch") {
            let itemElement = document.createElement('checkout-item-c');
            itemElement.setAttribute("name", item.name);
            itemElement.setAttribute("extra", item.description);  // Description for merch
            itemElement.setAttribute("qty", item.quantity);  // Quantity
            itemElement.setAttribute("price", item.price);  // Price for the merch item
            ins.appendChild(itemElement);  // Append it to the container
          } else if (item.type === "concert") {
            let concertElement = document.createElement('checkout-item-c');
            let concertDetails = `${item.loc}, ${item.date}, ${item.seatType}`;
            concertElement.setAttribute("name", `${item.city} Concert`);  // Concert city
            concertElement.setAttribute("extra", concertDetails);  // Details for concert
            concertElement.setAttribute("qty", item.quantity);  // Concert quantity
            concertElement.setAttribute("price", item.price);  // Price for the seat type
            ins.appendChild(concertElement);  // Append it to the container
          } else if (item.type === "music") {
            let musicElement = document.createElement("checkout-item-c");
            let musicType = `${item.formatType}`;
            musicElement.setAttribute("name", `${item.name} Album`);
            musicElement.setAttribute("extra", musicType);
            musicElement.setAttribute("qty", item.quantity);
            musicElement.setAttribute("price", item.price);
            ins.appendChild(musicElement);
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

function orderMerch () {
  const input = document.getElementById("merchQuantity");
  const inputValue = input.value.toString();
  const input2 = document.getElementById("title");
  const inputValue2 = input2.innerHTML;
  let text = document.getElementById("size").options[document.getElementById("size").selectedIndex].text;
  if (text === "Select One" && text !== "Not a clothing item"){
    alert("Please select a clothing size before adding it to cart");
    return;
  }
  addMerchItem(inputValue2,inputValue)
  localStorage.setItem("merchSuccess?", "yes")
  window.location.href = "merch.html"
}

function orderConcert () {
  const input = document.getElementById("ticketQuantity");
  const inputValue = input.value;
  var e = document.getElementById("seat");
  var text = e.options[e.selectedIndex].text;
  if (text === "Select One"){
    alert("Please select a seat type before adding it to cart");
    return;
  }
  const input2 = document.getElementById("title");
  const inputValue2 = input2.innerHTML;
  const start = inputValue2.indexOf("in")+3
  const end = inputValue2.indexOf(",")+4
  var city = inputValue2.substring(start,end).trim()
    // addConcertItem(city, quantity, seatType)
  addConcertItem(city,inputValue,text)
  localStorage.setItem("tourSuccess?", "yes")
  window.location.href = "tourdates.html"
}

function orderMusic() {
  const input = document.getElementById("musicQuantity");
  let inputValue = input.value;
  var e = document.getElementById("type");
  var text = e.options[e.selectedIndex].text;
  if (text === "Select One"){
    alert("Please select an audio format before adding it to cart");
    return;
  }
  const album = document.getElementById("title").innerHTML;
  addMusicItem(album, text, inputValue);
  localStorage.setItem("musicSuccess?", "yes");
  window.location.href = "music.html";
}

function applyPromo(){
  let code = document.getElementById("promo-code").value;
  let status = document.getElementById("validity");
  //the inputted code would be compared against a list of valid codes but for demonstration purposes
  //the only valid code will be hard coded
  if (code === "WorldTour2025") {
    discount = 0.8;
    status.style.color = "var(--bs-success)";
    status.innerHTML = "Promo Code Applied!";
    status.style.display = "block";
    document.getElementById("was-text").style.display = "block";
    document.getElementById("orig-price").style.display = "block";
    document.getElementById("orig-price").innerHTML = `$${Number(calculateTotPrice(true).toFixed(2)).toLocaleString("en-US")}`;
  } else {
    status.style.color = "var(--bs-danger)";
    status.innerHTML = "Invalid Promo Code! <br>For judges testing functionality: The promo code is \"WorldTour2025\"";
    status.style.display = "block";
  }
  const ins1 = document.getElementById("tot-price");
  ins1.innerHTML = `$${calculateTotPrice()}`;
}

/*
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
*/
