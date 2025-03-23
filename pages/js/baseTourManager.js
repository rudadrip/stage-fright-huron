//creates the success notification

document.addEventListener("DOMContentLoaded", () => {
    let generate = localStorage.getItem("tourSuccess?");
    console.log(generate);

    if (generate === "yes"){
        appendAlert("Item successfully added to cart!", "info");
        localStorage.setItem("tourSuccess?", "none invoked");
        window.setTimeout(function(){document.getElementById("alert").classList.add("alert-fade")}, 8000);
    }
}

)

const alertPlaceholder = document.getElementById('tourAlert');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" id="alert" role="alert">`,
    `   <div style="color: var(--bs-info-text-emphasis)">${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
}

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