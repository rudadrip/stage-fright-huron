cards = document.getElementsByClassName("card");
console.log(cards);
console.log(cards.length);
function add_anim(i) {
    cards[i].parentNode.classList.add("card-anim");
}


setTimeout(() => {
    let index = 0;
    let spaghetti = setInterval(() => {
    add_anim(index);
    index++;
    if (index >= 12){
        window.clearInterval(spaghetti);
    }
}, 150);
}, 500)