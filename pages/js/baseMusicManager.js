//creates success notification
document.addEventListener("DOMContentLoaded", () => {
    let generate = localStorage.getItem("musicSuccess?");
    console.log(generate);
    if (generate === "yes"){
        appendAlert("Item successfully added to cart!", "info");
        localStorage.setItem("musicSuccess?", "none invoked");
        try {
        window.setTimeout(function(){document.getElementById("alert").classList.add("alert-fade")}, 8000);
        } catch {
          //noop for the same reason as baseTourManager
          Function.prototype();
        }
    }
}

)

const alertPlaceholder = document.getElementById('musicAlert');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  console.log(wrapper);
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" id="alert" role="alert">`,
    `   <div style="color: var(--bs-info-text-emphasis)">${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
}