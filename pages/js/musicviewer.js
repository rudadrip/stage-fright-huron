const type_data = [
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

//set merch cookie before redirect
function to_music_view(event){
    document.cookie = `current_music_item=${event.srcElement.parentNode.getElementsByTagName("h5")[0].innerHTML}`;
}

//called on page load and populates the page according to the set cookie
async function display_music(){
    window.setTimeout(function(){return;}, 100);
    let data = await fetch("/pages/veryrealdatabase/music.json");
    const all_music = await data.json();
    //console.log(all_music); 
    let raw_cookies = document.cookie;
    raw_cookies = raw_cookies.toString().split("; ");
    const cookies = {};
    for (let i = 0; i < raw_cookies.length; i++){
        let current = raw_cookies[i].split("=");
        cookies[current[0]] = current[1];
    }

    for (let i = 0; i < all_music.length; i++){

        if (all_music[i].name === cookies.current_music_item){
            document.getElementById("title").innerHTML = all_music[i].name;
            document.getElementById("music-details").innerHTML = all_music[i].desc;
            document.getElementById("music-image").src = all_music[i].image;
            return;
        }
    }

    //for if the user somehow visits this page without a valid merch item set
    //apparently sometimes this fails and the page never gets populated correctly but I'm not sure why
    alert("Oops! Something went wrong! \nWe'll redirect you to the previous page, if this persists please email us at csupport@stagefright.com");
    //window.location.href = "/pages/merch.html"

    //await console.log(JSON.stringify(cookies))
}

async function price_change(event){
    let cur_selection = document.getElementById("type").options[document.getElementById("type").selectedIndex].text;
    const quantities = document.getElementById("musicQuantity");
    const quantity_header = document.getElementById("quantityHeader");
    for (let i = 0; i < type_data.length; i++){
        if (type_data[i].type === cur_selection){
            console.log(cur_selection);
            document.getElementById("price").innerHTML = `$${type_data[i].price}`;
            if (cur_selection == "Digital" || cur_selection == "Digital & Vinyl"){
                quantities.style.display = "none";
                quantity_header.style.display = "none";
            } else {
                quantities.style.display = "block";
                quantity_header.style.display = "block";
            }
            return;
        }
    }
    document.getElementById("price").innerHTML = `No Audio Medium Selected`;
}

setTimeout(async function(){
    if (document.getElementById("title").innerHTML == "[Music name]"){
        let data = await fetch("/pages/veryrealdatabase/music.json");
        const all_music = await data.json();
        //console.log(all_music); 
        let raw_cookies = document.cookie;
        raw_cookies = raw_cookies.toString().split("; ");
        const cookies = {};
        for (let i = 0; i < raw_cookies.length; i++){
            let current = raw_cookies[i].split("=");
            cookies[current[0]] = current[1];
        }

        for (let i = 0; i < all_music.length; i++){

            if (all_music[i].name === cookies.current_music_item){
                document.getElementById("title").innerHTML = all_music[i].name;
                document.getElementById("music-details").innerHTML = all_music[i].desc;
                document.getElementById("music-image").src = all_music[i].image;
                return;
            }
        }
    } else {
        return;
    }
}, 1000);