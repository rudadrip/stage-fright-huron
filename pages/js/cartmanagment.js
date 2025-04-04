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
    { "city": "New York, NY", "loc": "Madison Square Garden", "date": "June 10, 2025", "image": "Madison_Square_Garden.jpg" },
    { "city": "Los Angeles, CA", "loc": "The Forum", "date": "June 20, 2025", "image": "The_Forum.jpg" },
    { "city": "Chicago, IL", "loc": "United Center", "date": "July 1, 2025", "image": "United_Center.jpg" },
    { "city": "Houston, TX", "loc": "Toyota Center", "date": "July 5, 2025", "image": "Toyota_Center.jpg" },
    { "city": "Dallas, TX", "loc": "American Airlines Center", "date": "July 10, 2025", "image": "American_Airlines_Center.jpg" },
    { "city": "Atlanta, GA", "loc": "State Farm Arena", "date": "July 15, 2025", "image": "State_Farm_Arena.jpg" },
    { "city": "Miami, FL", "loc": "Kaseya Center", "date": "July 20, 2025", "image": "Kaseya_Center.jpg" },
    { "city": "Orlando, FL", "loc": "Amway Center", "date": "July 22, 2025", "image": "Amway_Center.jpg" },
    { "city": "Boston, MA", "loc": "TD Garden", "date": "August 5, 2025", "image": "TD_Garden.jpg" },
    { "city": "Philadelphia, PA", "loc": "Wells Fargo Center", "date": "August 10, 2025", "image": "Wells_Fargo_Center.jpg" },
    { "city": "Washington, DC", "loc": "Capital One Arena", "date": "August 15, 2025", "image": "Capital_One_Arena.jpg" },
    { "city": "Seattle, WA", "loc": "Climate Pledge Arena", "date": "August 20, 2025", "image": "Climate_Pledge_Arena.jpg" }
  ];
  
//Merch data
  const merch_management = [
    { "name": "Band T-shirt", "desc": "Show your love for Stage Fright with this soft comfy T-shirt featuring our bold logo. Perfect for any fan!", "price": "12.99","img":"tshirt.jpg" },
    { "name": "Band Crewneck", "desc": "Stay cozy with the Stage Fright crewneck designed for comfort and style. A must-have for cooler days!", "price": "29.99","img":"crewneck.jpg" },
    { "name": "Guitar Pick", "desc": "Grab a Stage Fright guitar pick for that extra touch of rock—durable sleek and logo branded.", "price": "5.99", "img": "guitarpick.jpg" },
    { "name": "Band Beanie", "desc": "Top off your look with the Stage Fright beanie featuring our logo for a stylish warm fit.", "price": "11.99", "img":"beanie.jpg" }
  ];

//Music data
  const albums_management = [
      {
          "name": "Diamond Eyes",
          "desc": "Diamond Eyes by Stage Fright is a powerful mix of raw emotion and electrifying rock. The album blends gripping guitar riffs with melodic vocals to tell stories of resilience, vulnerability, and life's ups and downs. With its mix of high-energy anthems and heartfelt ballads, Diamond Eyes is a sparkling gem that leaves a lasting impact.",
          "img": "diamond-eyes.jpg"
      }, {
          "name": "Walk",
          "desc": "Walk by Stage Fright invites listeners to embark on a deeply personal and transformative musical journey. Each song feels like a step forward, exploring themes of courage, healing, and self-discovery. With its soulful melodies and dynamic energy, Walk captures the spirit of pushing through challenges and finding your path, making it a soundtrack for life’s most meaningful strides.",
          "img": "Walk.webp"
      }, {
          "name": "Get Dirty",
          "desc": "Get Dirty by Stage Fright is an unapologetic, high-octane dive into the raw and unfiltered sides of life. Packed with thunderous riffs, fiery vocals, and fearless energy, the album embraces chaos, passion, and rebellion. Get Dirty is a celebration of living untamed and embracing the messy, beautiful imperfections that define us.",
          "img": "get-dirty.webp"
      }
  ]

  const format_management = [
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
  function addMercherItem(name, quantity, size) {
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
              size: size,
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
  
  function addMusicItem(album, type, quant){
    const music = albums_management.find(mus => mus.name === album);
    const medium = format_management.find(form => form.type === type);
    if (!music || !medium) {
      console.log(album, type, quant);
      console.log(music, medium);
      console.error("Invalid music type or album name");
      return;
    }

    let existingAlbum = cart_management.find(item => item.name === album && item.FormatType === type && item.type === "music");

    if (existingAlbum) {
      existingAlbum.quantity += quantity;
    } else {
      cart_management.push({
        name: album,
        formatType: type,
        quantity: quant,
        price: medium.price,
        type: "music"
      })
    }
  
    saveCartToCookies(cart_management);
  }

  // Delete a specific merch item from the cart
  function deleteMerchItem(name, size) {
      cart_management = cart_management.filter(item => (item.name !== name && item.size !== size)|| item.type !== 'merch');
      saveCartToCookies(cart_management);
  }
  
  // Delete a specific concert item from the cart
  function deleteConcertItem(city, seatType) {
      cart_management = cart_management.filter(item => item.city !== city || item.seatType !== seatType || item.type !== 'concert');
      saveCartToCookies(cart_management);
  }

  function deleteMusicItem(name, type) {
    cart_management = cart_management.filter(item => item.name !== name || item.formatType !== type || item.type !== "music");
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
        } else if (item.type == "music") {
            var insertImg = 0;
            for (var i = 0; i < albums_management.length; i++) {
                if (albums_management[i].name == item.name) {
                    insertImg = albums_management[i].img;
                }
            }
            imgCell.innerHTML = `<img src="/assets/icons/${insertImg}" alt="${item.name}" class="img-fluid">`;
        }
  
        const infoCell = document.createElement("td");
        var insertName = 0
        if (item.type == "merch") {
            insertName = `${item.name},<br>${item.size}`;
        } else if (item.type == "concert") {
            insertName = `${item.city} Concert`;
        } else if (item.type == "music") {
            insertName = `${item.name} Album, ${item.formatType}`;
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