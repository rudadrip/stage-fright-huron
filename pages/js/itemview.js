function to_item_view () {
  document.cookie = `item=${}`
  windows.location.href = "itemview.html";
}

async function display_item () {
  let data = await fetch("veryrealdatabase/")
}