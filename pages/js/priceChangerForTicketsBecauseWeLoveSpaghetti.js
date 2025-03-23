seat_data = [
    {
        "loc":"VIP Box/Suite",
        "price": "3,000"
    }, {
        "loc": "Club Seating",
        "price": "750"
    }, {
        "loc": "Lower Bowl",
        "price": "250"
    }, {
        "loc": "Mid-Level/Mezzanine",
        "price": "125"
    }, {
        "loc": "Upper Bowl",
        "price": "40"
    }, {
        "loc": "Standing Room",
        "price": "20"
    }
]

//called whenever the user changes the ticket type, dynamically updates the price displayed to match the ticket
async function price_change(event){
    let cur_selection = document.getElementById("seat").options[document.getElementById("seat").selectedIndex].text;
    for (let i = 0; i < seat_data.length; i++){
        if (seat_data[i].loc === cur_selection){
            document.getElementById("price").innerHTML = `$${seat_data[i].price}.00`;
            return;
        }
    }
    document.getElementById("price").innerHTML = `No seat selected`;
}