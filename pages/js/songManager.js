document.addEventListener("DOMContentLoaded", async (event) => {
    //let music = document.getElementsByClassName("music-container")[0].children[2].children[0];
    let music = Array.from(document.getElementsByClassName("music-container"));
    let index_num = 0;

    let data = await fetch("/pages/veryrealdatabase/music.json");
    const music_data = await data.json();

    let raw_cookies = document.cookie;
    raw_cookies = raw_cookies.toString().split("; ");
    const cookies = {};

    for (let i = 0; i < raw_cookies.length; i++){
        let current = raw_cookies[i].split("=");
        cookies[current[0]] = current[1];
    }

    let this_album;

    music_data.some(function(album){
        if (album.name == cookies.current_music_item){
            this_album = album;
            return true;
        }
    })

    music.forEach(function(grouping, index){
        const title = grouping.children[0];
        const bar = grouping.children[2].children[1];
        const button = grouping.children[2].children[0];
        const track = grouping.children[1];
        const duration = grouping.children[3];
        const this_index = index_num;
        index_num++;
        
        track.src = this_album.songs[Object.keys(this_album.songs)[this_index]];
        track.load();
        title.innerHTML = Object.keys(this_album.songs)[this_index]

        track.addEventListener("loadedmetadata", event => {
            duration.innerHTML = `0:00/${Math.floor(track.duration/60)}:${Math.floor(track.duration%60)}`;
        })

        button.addEventListener("click", event => {
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
            bar.style.background = `linear-gradient(to right, white 0% ${((track.currentTime/track.duration)*100.0) || 0}%, var(--bs-primary-text-emphasis) ${((track.currentTime/track.duration)*100.0) || 0}% 55%)`;
            duration.innerHTML = `${Math.floor(track.currentTime/60)}:${String(Math.floor(track.currentTime%60)).padStart(2, "0")}/${Math.floor(track.duration/60)}:${Math.floor(track.duration%60)}`
        })

        track.addEventListener("ended", event => {
            button.src = "/assets/icons/play.png";
        })

        bar.addEventListener("click", event => {
            console.log(`attempting to set time to ${Math.max(0, (event.clientX - event.currentTarget.getBoundingClientRect().left)/event.currentTarget.clientWidth) * track.duration}`);
            track.currentTime = String(Math.max(0, (event.clientX - event.currentTarget.getBoundingClientRect().left)/event.currentTarget.clientWidth) * track.duration);
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