window.addEventListener("load", () => {
    const page = document.querySelector(".shakeLeft");
    setTimeout(() => {
        page.classList.remove("shakeLeft");
        page.classList.add("shakeRight");
        
    },600)
})
