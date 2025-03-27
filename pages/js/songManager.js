document.addEventListener("DOMContentLoaded", (event) => {
    //let music = document.getElementsByClassName("music-container")[0].children[2].children[0];
    let music = Array.from(document.getElementsByClassName("music-container"));
    console.log(music);

    music.forEach(function(grouping, index){
        const bar = grouping.children[2].children[1];
        const button = grouping.children[2].children[0];
        const track = grouping.children[1];
        const duration = grouping.children[3];

        track.addEventListener("loadedmetadata", event => {
            duration.innerHTML = `0:00/${Math.floor(track.duration/60)}:${Math.floor(track.duration%60)}`;
        })

        button.addEventListener("click", event => {
            console.log(button.src);
            if (String(button.src).includes("/assets/icons/play.png")){
                for (let l = 0; l < music.length; l++){
                    music[l].children[2].children[0].src = "/assets/icons/play.png";
                    music[l].children[1].pause();
                }
                button.src = "/assets/icons/pause.png";
                track.play();
            } else {
                button.src = "/assets/icons/play.png";
                track.pause();
            }
        })

        track.addEventListener("timeupdate", event => {
            //console.log("white at ", (track.currentTime/track.duration)*50.0);
            //console.log("not white at ", 50.0-((track.currentTime/track.duration)*50.0));
            bar.style.background = `linear-gradient(to right, white 0% ${(track.currentTime/track.duration)*100.0}%, var(--bs-primary-text-emphasis) ${((track.currentTime/track.duration)*100.0)}% 50%)`;
            duration.innerHTML = `${Math.floor(track.currentTime/60)}:${String(Math.floor(track.currentTime%60)).padStart(2, "0")}/${Math.floor(track.duration/60)}:${Math.floor(track.duration%60)}`
            //console.log(bar.style.background);
        })

        track.addEventListener("ended", event => {
            button.src = "/assets/icons/play.png";
        })
    })

    /*
    for (let i = 0; i < music.length; i++){
        music[i].children[2].children[0].addEventListener("timeupdate", event => {
            track1.style.width = `${(music.currentTime/30.0)*100.0}%`;
        })
    }
        */
})