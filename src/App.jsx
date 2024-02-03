// App.js
import "./App.scss";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

import FileInput from "./Components/Input/FileInput";
import AudioFile from "./Components/Input/AudioFile";
import PlaylistArray from "./Components/Playlist/PlaylistArray";
import CurrentPlayingAudio from "./Components/CurrentPlaying/CurrentPlayingAudio";

import { Toaster } from "react-hot-toast"; // It give the accsess to send the notification to the fontend whether user is regiseter or login
import { useMusicContext } from "./Context";

const App = () => {
  const { playlist,darkmode } = useMusicContext();


  return (
    <section className={`${darkmode ? "app" : "lighten"}`}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Navbar />
      <Hero />
      <FileInput />

      {playlist.length === 0 ? (
        <h2 className="no-audio">Please Select a audio to play</h2>
      ) : (
        <>
          <PlaylistArray />
          <CurrentPlayingAudio />
          <AudioFile />
        </>
      )}
    </section>
  );
};

export default App;
