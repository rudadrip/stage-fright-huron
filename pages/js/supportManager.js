const info_data = [
    {
        "type": "merch",
        "data": "For Merchandise "
    }
];

async function hide_element(){
    return;
}

async function show_element(){
    return;
}

async function ticket_change(event){
    let cur_selection = document.getElementById("ticket-type").options[document.getElementById("ticket-type").selectedIndex].value;
    for (let i = 0; i < info_data.length; i++){
        if (info_data[i].loc === cur_selection){
            document.getElementById("price").innerHTML = `$${seat_data[i].price}.00`;
            return;
        }
    }
    document.getElementById("price").innerHTML = `No seat selected`;
}