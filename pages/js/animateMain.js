function resetAnimation() {
    localStorage.setItem("finishedHomeAnimate", "no");
    scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
    window.location.reload();
}

window.addEventListener("load", () => {
    const page = document.querySelector("body");
    const stageLeft = document.querySelector("#stage-left");
    const stageRight = document.querySelector("#stage-right");
    const stageCenter = document.querySelector("#stage-center")
    const fade = document.querySelector("#fadeIn");
    const navBar = document.querySelector("nav-bar");
    const button = document.querySelector("#memberButton");
    const sections = document.querySelectorAll("section");
    const hl1 = document.querySelector("#one");
    const hl2 = document.querySelector("#two");
    const hl3 = document.querySelector("#three");
    const dividers = document.querySelectorAll(".section-divider");
    const footer = document.querySelector("footer-c");

    console.log(localStorage.getItem("finishedHomeAnimate"));

    if (localStorage.getItem("finishedHomeAnimate") !== "yes"){
        console.log("we're IN");
        page.classList.add("shakeLeft");
        stageLeft.classList.add("stage-left");
        stageRight.classList.add("stage-right");
        stageCenter.classList.add("stage-center");
        fade.classList.add("fadeIn");
        navBar.classList.add("no-opacity");
        button.classList.add("no-opacity");
        for (let i = 0; i < sections.length; i++){
            sections[i].classList.add("no-opacity");
        }
        hl1.classList.add("highlight");
        hl2.classList.add("highlight");
        hl3.classList.add("highlight")
        for (let i = 0; i < dividers.length; i++){
            dividers[i].classList.add("no-opacity");
        }
        footer.classList.add("no-opacity");

        console.log(document.body.offsetHeight);
        void(document.body.offsetHeight);

        stageRight.addEventListener("animationend", () => {
            page.classList.remove("shakeLeft");
            page.classList.add("shakeRight");
        })
    
        stageCenter.addEventListener("animationend", () => {
            page.classList.remove("shakeRight");
            page.classList.add("crush");
        })
    
        sections[0].addEventListener("animationend", () => {
            localStorage.setItem("finishedHomeAnimate", "yes");
        })

        page.style.opacity = 1;
    } else {
        page.style.opacity = 1;
    }

})
