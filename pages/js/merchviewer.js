function to_merch_view(event){
    document.cookie = `current_merch_item=${event.srcElement.parentNode.getElementsByTagName("h5")[0].innerHTML}`;
    window.location.href = "/pages/merchviewer.html";
}

async function display_venue(){
    let data = await fetch("/pages/veryrealdatabase/merch.json");
    const all_merch = await data.json();
    //console.log(all_merch); 
    let raw_cookies = document.cookie;
    raw_cookies = raw_cookies.toString().split("; ");
    const cookies = {};
    for (let i = 0; i < raw_cookies.length; i++){
        let current = raw_cookies[i].split("=");
        cookies[current[0]] = current[1];
    }

    for (let i = 0; i < all_merch.length; i++){
        if (all_merch[i].name === cookies.current_merch_item){
            document.getElementById("title").innerHTML = all_merch[i].name;
            document.getElementById("merch-details").innerHTML = all_merch[i].desc;
            document.getElementById("merch-image").src = all_merch[i].image;
            document.getElementById("price").innerHTML = `$${all_merch[i].price}`;
            return;
        }
    }

    alert("Oops! Something went wrong! \nWe'll redirect you to the previous page, if this persists please email us at issues@stagefright.com");
    window.location.href = "/pages/merch.html"

    //await console.log(JSON.stringify(cookies))
}