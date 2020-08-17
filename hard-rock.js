document.getElementById("songSearchButton").addEventListener("click", function () {
    const songName = document.getElementById("search").value;

    if (songName != '') {
        try{
            fetch("https://api.lyrics.ovh/suggest/" + songName)
            .then(response => response.json())
            .then(json => setSongAndLyricsList(json));
        }catch{
            alert("Something went wrong...");
        }
    } else {
        alert("Please Enter Any Song/Artist name");
    }
});

function setSongAndLyricsList(dataList) {
    const length = dataList.data.length;
    let songListDiv = "";
    for (let i = 0; i < length && i < 10; i++) {
        const song = dataList.data[i];

        songListDiv += `<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name" id="title${i}">${song.title}</h3>
                                <p class="author lead"><strong>Album by : </strong> <span id="artist${i}">${song.artist.name}</span><strong>  ,  Duration : </strong><span>${(song.duration / 60).toFixed(2)}</span> m.</p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button class="btn btn-success" onclick="setLyrics('${i}')">Get Lyrics</button>
                            </div>
                        </div> `;
    }

    document.getElementById("songList").innerHTML = songListDiv;
}

function setLyrics(id){
    const title = document.getElementById("title"+id).innerText;
    const artist = document.getElementById("artist"+id).innerText;
    try {
    fetch("https://api.lyrics.ovh/v1/"+artist+"/"+title)
            .then(response => response.json())
            .then(json => {
                document.getElementById("lyricsTitle").innerText = title;
                document.getElementById("lyrics").innerText = json.lyrics;
            });
        }catch{
            alert("Something went wrong...");
        }        
}