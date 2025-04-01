//set merch cookie before redirect
function to_merch_view(event){
    document.cookie = `current_merch_item=${event.srcElement.parentNode.getElementsByTagName("h5")[0].innerHTML}`;
}

//called on page load and populates the page according to the set cookie
async function display_merch(){
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
            if (!all_merch[i].clothes){
                document.getElementById("size").style.display = "none";
                document.getElementById("size-header").style.display = "none";
                localStorage.setItem("pick", "yes");
            } else {
                localStorage.setItem("pick", "no");
            }
            return;
        }
    }

    //for if the user somehow visits this page without a valid merch item set
    //apparently sometimes this fails and the page never gets populated correctly but I'm not sure why
    alert("Oops! Something went wrong! \nWe'll redirect you to the previous page, if this persists please email us at csupport@stagefright.com");
    window.location.href = "/pages/merch.html"

    //await console.log(JSON.stringify(cookies))
}

window.setTimeout(async function(){
    if (document.getElementById("title").innerHTML == "[Merch name]") {
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
                if (!all_merch[i].clothes){
                    document.getElementById("size").style.display = "none";
                    document.getElementById("size-header").style.display = "none";
                }
                return;
            }
        }
    } else {
        return;
    }
}, 1000)