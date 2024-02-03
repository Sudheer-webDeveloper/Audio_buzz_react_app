import { createContext, useContext, useState,useEffect } from "react";
import {toast }from "react-hot-toast"
import icon from '../src/assets/icon.png'

const MusicContext = createContext();

export const MusicContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioRef, setAudioRef] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [darkmode,setDarkmode] = useState(localStorage.getItem('musicDarkmode') || false)




  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);

    const lastPlayingIndex =
      parseInt(localStorage.getItem("lastPlayingIndex"), 10) || 0;
    setCurrentTrackIndex(lastPlayingIndex);

    const lastPlayingTime =
      parseFloat(localStorage.getItem("lastPlayingTime")) || 0;
    audioRef.currentTime = lastPlayingTime;
  }, []);

  useEffect(() => {
    // Here i am updating the localstorage when the current track changes
    localStorage.setItem("lastPlayingIndex", currentTrackIndex);
  }, [currentTrackIndex]);



// These is my main useeffect

  useEffect(() => {
    const handleEnded = () => {
      if (currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentTrackIndex(0);
      }
    };
  
    // When ever the audiRef exsists then only I am adding the event lister
    if (audioRef) {
      audioRef.addEventListener("ended", handleEnded);
    }
  
    // When ever the component is unmounting i am remvoing the event listener
    return () => {
      // Check if audioRef exists before removing the event listener
      if (audioRef) {
        audioRef.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef, currentTrackIndex, playlist]);
  

  useEffect(() => {
    if (isPlaying) {
      audioRef.play();
    } else {
      audioRef.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    // Here I am Updating local storage with the last played audio only
    localStorage.setItem(
      "lastPlayedAudio",
      JSON.stringify(playlist[currentTrackIndex])
    );
  }, [currentTrackIndex, playlist]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleTimeUpdate = () => {
    // Updating the local storage when the playback position changes
    localStorage.setItem("lastPlayingTime", audioRef.currentTime);
  };

  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };






    // Here I am removing the specific Item when clicked on button
    const removeFromPlaylist = (index) => {
        const updatedPlaylist = [...playlist];
        updatedPlaylist.splice(index, 1); 
        setPlaylist(updatedPlaylist);
        localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
        toast.success("Audio Removed")
      };




  
      



  const handleFileChange = (event) => {
    const files = event.target.files;
  
    const newPlaylist = Array.from(files).map((file) => {
      const objectURL = URL.createObjectURL(file);
      const id = generateUniqueId();
      const name = file.name.replace(/\.[^/.]+$/, "");
      const img =icon;
  
      // Here i am cheking if the new file is adding with the same name i am not going to add it
      const isDuplicate = playlist.some((track) => track.name === name);
  
      if (!isDuplicate) {
        toast.success("Audio Added");
        return { id, file: objectURL, name, img };
      } else {
        toast.error("Audio already exists");
        return null; // Return null for duplicates
      }
    });
  
    // Filter out null values (duplicates) before updating the playlist
    const filteredNewPlaylist = newPlaylist.filter((track) => track !== null);
    setPlaylist([...playlist, ...filteredNewPlaylist]);
  };
  

  const handlePlaylistItemClick = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(!isPlaying);
  };


  // storing the current track or audio inside the localstorage based on the question to play when ever the user refresh the page
  useEffect(() => {
    const currentTrack = playlist[currentTrackIndex];
    localStorage.setItem(
      "playlist",
      JSON.stringify(currentTrack ? [currentTrack] : [])
    );
  }, [currentTrackIndex, playlist]);



  // play audio , farward , backward buttons

  const playAudio = (index) => {
    if (playlist[index]) {
      audioRef.src = playlist[index].file;  // here i am updating the audio src directly
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const playBackward = () => {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
    playAudio(newIndex);
  };

  const playForward = () => {
    const newIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
    playAudio(newIndex);
  };




      // Now I am clearing tha all items there in the local storage when user click on the specific button 

      const removeAllFromPlaylist = () => {
        // Clearing the playlist in the state
        setPlaylist([]);
    
        // Clearing the playlist in local storage
        localStorage.removeItem("playlist");

        toast.success("All Audios Removed")
      };


// darkmode and light mode

const toggleDarkMode = () => {
  const currentDarkMode = JSON.parse(localStorage.getItem('musicDarkmode'));
  const newDarkMode = !currentDarkMode;
  localStorage.setItem('musicDarkmode', JSON.stringify(newDarkMode));
  setDarkmode(newDarkMode);
};




  return (
    <MusicContext.Provider value={{ playlist,setPlaylist,currentTrackIndex,setCurrentTrackIndex,audioRef,setAudioRef,isPlaying,setIsPlaying,handlePlayPause,handleTimeUpdate,generateUniqueId,handleFileChange,handlePlaylistItemClick,playForward,playBackward,removeFromPlaylist,removeAllFromPlaylist,darkmode,setDarkmode,toggleDarkMode }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  return useContext(MusicContext);
};
