console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "MACHAYENGE - EMIWAY", filePath: "songs/1.mp3", coverPath: "covers/12.jpg"},
    {songName: "Balma - Khiladi 786", filePath: "songs/2.mp3", coverPath: "covers/11.jpg"},
    {songName: "निशाणा तुला दिसला ना - ANURADHA PAUDWAL, SURESH WADKAR", filePath: "songs/3.mp3", coverPath: "covers/13.jpg"},
    {songName: "तुम्हारी कसम मैं शराबी ना होता- आनंद शिंदे", filePath: "songs/4.mp3", coverPath: "covers/14.jpg"},
    {songName: "Bewafa - Imran khan", filePath: "songs/5.mp3", coverPath: "covers/15.jpg"},
    {songName: "Tere Ishq Mein Naachenge - Raja Hindustani", filePath: "songs/6.mp3", coverPath: "covers/16.jpg"},
    {songName: "Peele Peele O Morey Raja - Tirangaa", filePath: "songs/7.mp3", coverPath: "covers/17.jpg"},
    {songName: "Hale Dil Tujhko Sunata - Murder 2 ", filePath: "songs/8.mp3", coverPath: "covers/18.jpg"},
    {songName: "Ro-Ro Ke Arja Gujarda Hai Dil - Honey Singh", filePath: "songs/9.mp3", coverPath: "covers/19.jpg"},
    {songName: "Yaarr Ni Milyaa - Harrdy Sandhu, B Praak", filePath: "songs/10.mp3", coverPath: "covers/20.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})