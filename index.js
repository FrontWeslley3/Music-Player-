const image = document.getElementById('cover');
const title = document.getElementById('music-title');
const artist = document.getElementById('music-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const playerProgress = document.getElementById('player-progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Gas Station Run.mp3',
        displayName: 'Larry June - Gas Station Run',
        cover: 'assets/black.jpg',
        artist: 'Larry June',
    },
    {
        path: 'assets/Early Bird.mp3',
        displayName: 'Larry June - Early Bird',
        cover: 'assets/mustang.jpg',
        artist: 'Larry June',
    },
    {
        path: 'assets/Good Today.mp3',
        displayName: 'Larry June - Good Today',
        cover: 'assets/civic.webp',
        artist: 'Larry June',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    if (music.src) { // Verifica se há uma música carregada
        isPlaying = true;
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
        music.play().catch(error => {
            console.error('Erro ao tentar reproduzir a música:', error);
            alert('Não foi possível reproduzir a música. Verifique o console para mais detalhes.');
        });
    } else {
        console.warn('Nenhuma música carregada para reprodução.');
    }
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    console.log('Carregando música:', song.path);
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
    music.load(); // Carrega a música
    music.play().catch(error => {
        console.error('Erro ao tentar reproduzir a música:', error);
        alert('Não foi possível reproduzir a música. Verifique o console para mais detalhes.');
    });
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    if (isNaN(duration) || duration === Infinity) return; // Verifica se a duração é válida
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    durationEl.textContent = formatTime(duration);
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Inicializa o player com a primeira música e começa a tocar
loadMusic(songs[musicIndex]);
