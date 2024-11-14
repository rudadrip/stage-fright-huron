const revert = document.getElementById("base-container").innerHTML

async function doFunc(){
    if (!!!document.getElementById("alt-presence")) {
    const stuff = await fetch("letsGoNuclear.html");
    const otherstuff = await stuff.text();
    document.getElementById("base-container").innerHTML = otherstuff;
  } else {
    document.getElementById("base-container").innerHTML = revert;
  }
}

function makeShort(element) {
    element.addEventListener("animationend", function(){
        element.classList.add("go-short");
        console.log("anim done");
    }, {once: true}); 
    
    console.log("execute");
}

function goBack(elements) {
    elements.forEach(function (element){
        element.classList.add("go-back");
    })

}

function goRight() { 
    /*var heightCards = Array.from(document.getElementsByClassName("make-me-short"));
    heightCards.forEach(makeShort);*/
    if (!!document.getElementById("alt-presence")) {
        doFunc();
        return;
    }

    var bottomRight = document.getElementById("bottomRight"); 
    var bottomLeft = document.getElementById("bottomLeft");
    var middleRight = document.getElementById("middleRight"); 
    var middleLeft = document.getElementById("middleLeft");
    var topRight = document.getElementById("topRight"); 
    var topLeft = document.getElementById("topLeft");

    topLeft.addEventListener("animationend", doFunc);
    /*if (bottomRight.classList.contains("go-right")) {
        goBack();
        return;
    }*/
    bottomRight.classList.add("go-right"); 
    bottomLeft.classList.add("go-left"); 

    middleRight.classList.add("go-right", "delay-middle"); 
    middleLeft.classList.add("go-left", "delay-middle");

    topRight.classList.add("go-right", "delay-top"); 
    topLeft.classList.add("go-left", "delay-top");
    /*cardContainer.addEventListener("animationend", function() { 
        cardContainer.style.display = "none"; });*/
}

document.getElementById("lescrip").onclick = goRight;



