// AudioPlayer.js
import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const storedTrack = parseInt(localStorage.getItem('currentTrack')) || 0;

    setPlaylist(storedPlaylist);
    setCurrentTrack(storedTrack);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrack', currentTrack.toString());
  }, [playlist, currentTrack]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaylist([file.path]);
      setCurrentTrack(0);

      // Store the selected file name in local storage
      localStorage.setItem('selectedFile', file.path);
    }
  };

  const getFileUrl = (fileName) => `http://localhost:5173/audio/${fileName}`;



  const handlePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch(error => console.error("Play error:", error));
    } else {
      audioRef.current.pause();
    }
  };

  const handleNext = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  const handleTimeUpdate = () => {
    localStorage.setItem('currentTime', audioRef.current.currentTime.toString());
  };

  useEffect(() => {
    const storedTime = parseFloat(localStorage.getItem('currentTime')) || 0;
    audioRef.current.currentTime = storedTime;
  }, [currentTrack]);

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <audio
        ref={audioRef}
        controls
        onEnded={handleNext}
        onTimeUpdate={parseInt(localStorage.getItem("lastPlayingTime"),10) || handleTimeUpdate}
        src={playlist[currentTrack] && getFileUrl(playlist[currentTrack])}

      />
      <button onClick={handlePlay}>Play/Pause</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AudioPlayer;
