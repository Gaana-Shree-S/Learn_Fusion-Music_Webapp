const audio = document.getElementById('audio-player');
let currentTrackIndex = 0;
let playlist = [];

const songs = [
  { title: 'Song 1', artist: 'Artist 1', url: 'songs/song1.mp3' },
  { title: 'Song 2', artist: 'Artist 2', url: 'songs/song2.mp3' },
  { title: 'Song 3', artist: 'Artist 3', url: 'songs/song3.mp3' },
  { title: 'Song 4', artist: 'Artist 4', url: 'songs/song4.mp3' },
];

function loadTrack(index) {
  audio.src = playlist[index].url;
  audio.play();
  document.getElementById('play-btn').textContent = 'Pause';
}

document.getElementById('play-btn').addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    this.textContent = 'Pause';
  } else {
    audio.pause();
    this.textContent = 'Play';
  }
});

document.getElementById('next-btn').addEventListener('click', function() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

document.getElementById('prev-btn').addEventListener('click', function() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
});

document.getElementById('volume-control').addEventListener('input', function() {
  audio.volume = this.value;
});

function displaySongs(songList) {
  const songListElement = document.getElementById('song-list');
  songListElement.innerHTML = '';  // Clear previous list
  songList.forEach((song, index) => {
    const songElement = document.createElement('li');
    songElement.textContent = `${song.title} by ${song.artist}`;
    songElement.addEventListener('click', () => {
      playlist.push(song);  // Add selected song to the playlist
      displayPlaylist();
    });
    songListElement.appendChild(songElement);
  });
}

function displayPlaylist() {
  const playlistElement = document.getElementById('playlist');
  playlistElement.innerHTML = '';  // Clear previous playlist
  playlist.forEach((track, index) => {
    const trackElement = document.createElement('li');
    trackElement.textContent = `${track.title} by ${track.artist}`;
    trackElement.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(index);
    });
    playlistElement.appendChild(trackElement);
  });
}

document.getElementById('search-bar').addEventListener('input', function(event) {
  const query = event.target.value.toLowerCase();
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(query) || 
    song.artist.toLowerCase().includes(query)
  );
  displaySongs(filteredSongs);
});

displaySongs(songs);
