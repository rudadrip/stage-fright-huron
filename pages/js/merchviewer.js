function to_merch_view(event){;
    window.location.href = "/pages/merchviewer.html";
}

async function display_venue(){
    let data = await fetch("/pages/veryrealdatabase/merch.json");
    const all_mech = await data.json();
    //console.log(all_locations); 
    let raw_cookies = document.cookie;
    raw_cookies = raw_cookies.toString().split("; ");
    const cookies = {};
    for (let i = 0; i < raw_cookies.length; i++){
        let current = raw_cookies[i].split("=");
        cookies[current[0]] = current[1];
    }

    for (let i = 0; i < all_locations.length; i++){
        if (all_locations[i].loc === cookies.venue){
            //Edit elements by id here
            return;
        }
    }

    alert("Oops! Something went wrong! \nWe'll redirect you to the previous page, if this persists please email us at issues@stagefright.com");
    window.location.href = "/pages/merch.html"

    //await console.log(JSON.stringify(cookies))
}