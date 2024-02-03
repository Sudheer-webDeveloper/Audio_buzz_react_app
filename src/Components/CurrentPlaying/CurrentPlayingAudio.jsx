import React from "react";
import { useMusicContext } from "../../Context";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBackSharp } from "react-icons/io5";

const CurrentPlayingAudio = () => {
  const { playlist, currentTrackIndex, handlePlayPause, isPlaying,playForward,playBackward } =
    useMusicContext();

  return (
    <section className="current-playing playlist-items">
      <h2 className="heading">Now Playing</h2>
      {playlist[currentTrackIndex] ? (
        <div className="currently-played">
          <div className="audio">
            <img src={playlist[currentTrackIndex].img} alt="Now Playing" />
            <h2>{playlist[currentTrackIndex].name}</h2>
          </div>


<div className="play-farward-buttons">
  <h3 onClick={playBackward}>
    <IoPlaySkipBackSharp />
  </h3>

          <h3 onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </h3>


<h3 onClick={playForward}>
    <IoPlaySkipForward />
</h3>
</div>
        </div>
      ) : (
        <div className="null">
          <p>No track selected</p>
        </div>
      )}
    </section>
  );
};

export default CurrentPlayingAudio;
