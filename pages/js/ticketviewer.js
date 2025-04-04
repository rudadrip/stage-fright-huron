//add cookie to retain which venue was selected
function to_ticket_view(event){
    document.cookie = `venue=${event.srcElement.parentNode.getElementsByTagName("p")[0].innerHTML}`;
}

//extracts and reads the venue cookie then populates the page accordingly
async function display_venue(){
    let data = await fetch("/pages/veryrealdatabase/locations.json");
    const all_locations = await data.json();
    console.log(all_locations); 
    let raw_cookies = document.cookie;
    raw_cookies = raw_cookies.toString().split("; ");
    const cookies = {};
    for (let i = 0; i < raw_cookies.length; i++){
        let current = raw_cookies[i].split("=");
        cookies[current[0]] = current[1];
    }

    for (let i = 0; i < all_locations.length; i++){
        if (all_locations[i].loc === cookies.venue){
            document.getElementById("title").innerHTML = `Tickets for ${cookies["venue"]} in ${all_locations[i].city} on ${all_locations[i].date}`;
            document.getElementById("venue-image").src = all_locations[i].image;
            document.getElementById("venue-details").innerHTML = all_locations[i].description;
            return;
        }
    }

    //for if the user somehow visits the page without a venue cookie set/valid
    //apparently sometimes this fails and the page never gets populated properly but I'm not sure why
    alert("Oops! Something went wrong! \nWe'll redirect you to the previous page, if this persists please email us at csupport@stagefright.com");
    window.location.href = "/pages/tourdates.html"

    //await console.log(JSON.stringify(cookies))
}

window.setTimeout(async function(){
    if (document.getElementById("title").innerHTML == "Tickets for [location] on [date]"){
        let data = await fetch("/pages/veryrealdatabase/locations.json");
        const all_locations = await data.json();
        console.log(all_locations); 
        let raw_cookies = document.cookie;
        raw_cookies = raw_cookies.toString().split("; ");
        const cookies = {};
        for (let i = 0; i < raw_cookies.length; i++){
            let current = raw_cookies[i].split("=");
            cookies[current[0]] = current[1];
        }

        for (let i = 0; i < all_locations.length; i++){
            if (all_locations[i].loc === cookies.venue){
                document.getElementById("title").innerHTML = `Tickets for ${cookies["venue"]} in ${all_locations[i].city} on ${all_locations[i].date}`;
                document.getElementById("venue-image").src = all_locations[i].image;
                document.getElementById("venue-details").innerHTML = all_locations[i].description;
                return;
            }
        }
    } else {
        return;
    }
}, 1000);