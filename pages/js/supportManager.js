const alertPlaceholder = document.getElementById('alert');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
}


var prev_selection = null;

async function type_change(event){
    let cur_selection = document.getElementById("ticket-type").options[document.getElementById("ticket-type").selectedIndex].value;
    if (prev_selection == null){
        document.getElementById(`${cur_selection}-parent`).style.display = "block";
        document.getElementById(`${cur_selection}-id`).required = true;
        document.getElementById(`email-parent`).style.display = "block";
        document.getElementById(`add-info`).style.display = "block";
        document.getElementById(`the-button`).style.display = "block";
        prev_selection = cur_selection;
    } else {
        document.getElementById(`${prev_selection}-parent`).style.display = "none";
        document.getElementById(`${prev_selection}-id`).required = false;
        document.getElementById(`${cur_selection}-parent`).style.display = "block";
        document.getElementById(`${cur_selection}-id`).required = true
        prev_selection = cur_selection;
    }
    // console.log(cur_selection);
}