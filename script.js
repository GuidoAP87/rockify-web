// ======================================================
//  VARIABLES GLOBALES
// ======================================================
let artistsData = []; 

// Referencias del Reproductor
let vinylPlayer = null;
let vinylCover = null;
let playerSong = null;
let playerArtist = null;
let isPlaying = false;

// EL AUDIO REAL (HTML5 Audio)
const audioPlayer = new Audio(); // <--- ¡AQUÍ ESTÁ LA MAGIA!

// Variables de la Playlist
let currentPlaylist = [];
let currentSongIndex = 0;

const currentPage = window.location.pathname;

// ======================================================
//  INICIALIZACIÓN
// ======================================================
document.addEventListener('DOMContentLoaded', async () => {
    await fetchArtistsData();

    vinylPlayer = document.getElementById('vinyl-player');
    vinylCover = document.getElementById('vinyl-cover');
    playerSong = document.getElementById('player-song');
    playerArtist = document.getElementById('player-artist');

    // Configuración del audio: Qué hacer cuando termina un tema
    audioPlayer.onended = () => playNext(); 

    if (currentPage.includes('detalle.html')) {
        renderDetailPage(); 
    } else if (currentPage.includes('album.html')) {
        renderAlbumPage(); 
    } else {
        renderHomePage();   
    }

    if(typeof checkUserSession === 'function') checkUserSession();
});

// ======================================================
//  CONEXIÓN CON EL SERVIDOR
// ======================================================
async function fetchArtistsData() {
    try {
        // Volvemos a poner la dirección completa del puerto 3000
        const response = await fetch('http://localhost:3000/api/artists'); 
        
        if (!response.ok) throw new Error('Error servidor');
        artistsData = await response.json();
        console.log("✅ Datos recibidos:", artistsData);
    } catch (error) {
        console.error("❌ Error:", error);
        artistsData = [];
    }
}

// ======================================================
//  LÓGICA DE RENDERIZADO (Inteligente: Lee Objetos y Textos)
// ======================================================

// Función auxiliar para obtener el título limpio
function getSongTitle(song) {
    return (typeof song === 'object' && song.title) ? song.title : song;
}

// Función auxiliar para obtener el archivo (si existe)
function getSongFile(song) {
    return (typeof song === 'object' && song.file) ? song.file : null;
}

function renderHomePage() {
    renderArtistsGrid();
    renderHeroBackground();
}

function renderArtistsGrid() {
    const grid = document.getElementById('artist-grid');
    if(!grid) return;
    grid.innerHTML = ''; 

    if(artistsData.length === 0) {
        grid.innerHTML = '<h3 style="color:white; text-align:center;">Cargando...</h3>';
        return;
    }

    artistsData.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openDetail(artist.id);

        let songsHTML = '';
        const top3 = artist.topSongs ? artist.topSongs.slice(0, 3) : [];
        
        top3.forEach(song => {
            const title = getSongTitle(song);
            // Pasamos 'null' como archivo porque los TopSongs aun no tienen file en tu DB
            songsHTML += `<li class="song-item" onclick="event.stopPropagation(); playSingleSong('${title}', '${artist.name}', 'Grandes Éxitos', '${artist.image}', null)">
                            <i class="fas fa-play"></i> ${title}
                          </li>`;
        });

        card.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}" onerror="this.src='img/default.png'">
            <div class="card-content">
                <h3 class="card-title">${artist.name}</h3>
                <p class="card-desc">${artist.bio}</p>
                <div class="albums-section"><strong>${artist.discography ? artist.discography.length : 0} Álbumes Disponibles</strong></div>
                <ul class="song-list">${songsHTML}</ul>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderHeroBackground() {
    const bgContainer = document.getElementById('hero-background');
    if(!bgContainer || artistsData.length === 0) return;
    bgContainer.innerHTML = '';
    for (let i = 0; i < 50; i++) { // Reduje a 50 para mejor rendimiento
        const artist = artistsData[i % artistsData.length];
        const img = document.createElement('img');
        img.src = artist.image;
        img.className = 'hero-bg-img'; 
        bgContainer.appendChild(img);
    }
}

function renderDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const artistId = parseInt(params.get('id'));
    const artist = artistsData.find(a => a.id === artistId);
    if (!artist) return;

    document.title = `ROCKIFY | ${artist.name}`;
    document.getElementById('detail-name').textContent = artist.name;
    document.getElementById('detail-bio').textContent = artist.bio;
    document.getElementById('detail-img').src = artist.image;

    const discographyContainer = document.getElementById('discography-list');
    discographyContainer.innerHTML = ''; 
    
    if(artist.discography) {
        artist.discography.forEach((album, index) => {
            const albumLink = `album.html?artistId=${artist.id}&albumIndex=${index}`;
            const imgId = `album-img-${index}`;

            // Preparamos lista de canciones visual
            let songsListHTML = '';
            album.songs.slice(0, 3).forEach(song => {
                const title = getSongTitle(song);
                const file = getSongFile(song); 
                // Truco: Usamos encodeURIComponent para pasar datos seguros
                songsListHTML += `<li onclick="playSingleSong('${title}', '${artist.name}', '${album.title}', '${album.cover}', '${file}')"><i class="fas fa-play-circle"></i> ${title}</li>`;
            });

            const albumHTML = `
                <div class="album-card">
                    <div class="album-cover-container">
                        <img id="${imgId}" src="${album.cover}" alt="${album.title}" class="album-cover-img-list">
                        <button class="btn-play-album-list" onclick="playAlbumWithAnimation(${artist.id}, ${index}, '${imgId}')">
                            <i class="fas fa-play"></i> REPRODUCIR ÁLBUM
                        </button>
                    </div>
                    <div class="album-info">
                        <h3>${album.title} <span style="font-size:0.8em; color:#888">(${album.year || ''})</span></h3>
                        <ul class="album-songs">
                            ${songsListHTML}
                        </ul>
                    </div>
                    <div class="album-actions">
                        <a href="${albumLink}" class="btn-more"><i class="fas fa-compact-disc"></i> CONOCER MÁS</a>
                    </div>
                </div>`;
            discographyContainer.innerHTML += albumHTML;
        });
    }
}

function renderAlbumPage() {
    const params = new URLSearchParams(window.location.search);
    const artistId = parseInt(params.get('artistId'));
    const albumIndex = parseInt(params.get('albumIndex'));
    const artist = artistsData.find(a => a.id === artistId);
    if (!artist || !artist.discography[albumIndex]) return;

    const album = artist.discography[albumIndex];

    document.getElementById('album-artist-name').textContent = artist.name;
    document.getElementById('album-title').textContent = album.title;
    document.getElementById('album-year').textContent = album.year || "";
    document.getElementById('album-tracks-count').textContent = `${album.songs.length} Canciones`;
    document.getElementById('album-cover-img').src = album.cover;
    const vinylLabel = document.getElementById('vinyl-label-img');
    if(vinylLabel) vinylLabel.src = album.cover;
    document.getElementById('album-bg').style.backgroundImage = `url('${album.cover}')`;

    const tracklistEl = document.getElementById('full-tracklist');
    let tracksHTML = '';
    
    // CREAR PLAYLIST COMPLETA (Detectando archivos)
    currentPlaylist = album.songs.map(song => ({
        title: getSongTitle(song),
        file: getSongFile(song), // Aquí capturamos el mp3 si existe
        artist: artist.name,
        album: album.title,
        cover: album.cover
    }));

    currentPlaylist.forEach((songData, i) => {
        // Icono: Si tiene archivo, mostramos Play lleno, sino Play vacío
        const iconClass = songData.file ? "fas fa-play-circle" : "far fa-play-circle";
        const styleColor = songData.file ? "color: var(--sol);" : "color: #666;";

        tracksHTML += `<li onclick="playFromPlaylist(${i})">
                        <span>${i + 1}. ${songData.title}</span>
                        <i class="${iconClass}" style="font-size:1rem; ${styleColor}"></i>
                       </li>`;
    });
    tracklistEl.innerHTML = tracksHTML;
}

function openDetail(id) {
    window.location.href = `detalle.html?id=${id}`;
}

// ======================================================
//  REPRODUCTOR Y ANIMACIONES
// ======================================================

function playSingleSong(title, artist, album, cover, file) {
    // Convertimos 'null' string a null real
    if(file === 'null' || file === 'undefined') file = null;

    currentPlaylist = [{ title, artist, album, cover, file }];
    currentSongIndex = 0;
    loadAndPlayCurrent();
}

function playFromPlaylist(index) {
    currentSongIndex = index;
    loadAndPlayCurrent();
}

function playAlbumWithAnimation(artistId, albumIndex, imgElementId) {
    const artist = artistsData.find(a => a.id === artistId);
    const album = artist.discography[albumIndex];

    // Mapeamos las canciones detectando si tienen archivo
    currentPlaylist = album.songs.map(song => ({
        title: getSongTitle(song),
        file: getSongFile(song),
        artist: artist.name,
        album: album.title,
        cover: album.cover
    }));
    currentSongIndex = 0;

    // Animación
    const sourceImg = document.getElementById(imgElementId);
    const targetVinyl = document.querySelector('.vinyl-disk');

    if (sourceImg && targetVinyl) {
        const sourceRect = sourceImg.getBoundingClientRect();
        const targetRect = targetVinyl.getBoundingClientRect();

        const flyingVinylWrapper = document.createElement('div');
        flyingVinylWrapper.classList.add('flying-vinyl-wrapper');
        
        const flyingLabel = document.createElement('img');
        flyingLabel.src = album.cover;
        flyingLabel.classList.add('flying-vinyl-label');
        
        flyingVinylWrapper.appendChild(flyingLabel);
        document.body.appendChild(flyingVinylWrapper);
        
        flyingVinylWrapper.style.width = `${sourceRect.width}px`;
        flyingVinylWrapper.style.height = `${sourceRect.height}px`;
        flyingVinylWrapper.style.top = `${sourceRect.top}px`;
        flyingVinylWrapper.style.left = `${sourceRect.left}px`;
        
        flyingVinylWrapper.getBoundingClientRect();

        flyingVinylWrapper.style.top = `${targetRect.top}px`;
        flyingVinylWrapper.style.left = `${targetRect.left}px`;
        flyingVinylWrapper.style.width = `${targetRect.width}px`;
        flyingVinylWrapper.style.height = `${targetRect.height}px`;
        flyingVinylWrapper.style.transform = 'rotate(360deg)'; 
        flyingVinylWrapper.style.opacity = '0';

        setTimeout(() => {
            flyingVinylWrapper.remove();
            loadAndPlayCurrent();
        }, 800);
    } else {
        loadAndPlayCurrent();
    }
}

function loadAndPlayCurrent() {
    if (currentPlaylist.length === 0) return;
    const songData = currentPlaylist[currentSongIndex];

    // 1. Mostrar reproductor visual
    if (vinylPlayer) {
        vinylPlayer.classList.remove('hidden');
        vinylPlayer.classList.add('is-playing');
        vinylPlayer.classList.remove('is-paused');
    }

    // 2. Actualizar textos
    if (vinylCover) vinylCover.src = songData.cover;
    if (playerSong) playerSong.textContent = songData.title;
    if (playerArtist) playerArtist.textContent = `${songData.artist} - ${songData.album}`;

    // 3. ACTUALIZAR AUDIO REAL
    if (songData.file) {
        // Si hay archivo, lo cargamos
        audioPlayer.src = `audio/${songData.file}`; 
        audioPlayer.volume = 1.0; // <--- AGREGA ESTA LÍNEA AQUÍ (Volumen al 100%)
        audioPlayer.play()
            .then(() => {
                console.log("Reproduciendo: " + songData.title);
                isPlaying = true;
                updatePlayIcon(true);
            })
            .catch(err => console.error("Error al reproducir:", err));
    } else {
        // Si no hay archivo, avisamos (pero el vinilo gira igual por facha)
        console.log("Canción sin archivo mp3 asociado.");
        alert(`La canción "${songData.title}" no tiene archivo de audio cargado aún.`);
        audioPlayer.pause();
        isPlaying = false; // Lo dejamos girar visualmente o lo pausamos, tú decides.
        // updatePlayIcon(false); // Descomenta si quieres que se ponga en pausa solo
    }
}

function togglePlayPause() {
    if (!vinylPlayer) return;

    if (isPlaying) {
        // Pausar
        vinylPlayer.classList.add('is-paused');
        audioPlayer.pause();
        isPlaying = false;
        updatePlayIcon(false);
    } else {
        // Reproducir
        vinylPlayer.classList.remove('is-paused');
        // Solo damos play si hay un archivo cargado
        if(audioPlayer.src) audioPlayer.play();
        isPlaying = true;
        updatePlayIcon(true);
    }
}

function updatePlayIcon(isPlaying) {
    const icon = document.getElementById('play-pause-icon');
    if(!icon) return;
    if(isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function playNext() {
    if (currentPlaylist.length === 0) return;
    currentSongIndex++;
    if (currentSongIndex >= currentPlaylist.length) currentSongIndex = 0;
    loadAndPlayCurrent();
}

function playPrev() {
    if (currentPlaylist.length === 0) return;
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = currentPlaylist.length - 1;
    loadAndPlayCurrent();
}

function playFullAlbum() {
    const trackList = document.getElementById('full-tracklist');
    if(trackList && trackList.firstElementChild) trackList.firstElementChild.click();
}