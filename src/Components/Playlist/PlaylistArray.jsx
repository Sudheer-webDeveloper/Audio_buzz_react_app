import React from "react";
import { useMusicContext } from "../../Context";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
const PlaylistArray = () => {
  const {
    playlist,
    handlePlaylistItemClick,
    currentTrackIndex,
    isPlaying,
    removeFromPlaylist,
    removeAllFromPlaylist,
    darkmode
  } = useMusicContext();

  //I am  Using Optional Chanining To Avoid Unnecessary Errors
  return (
    <section className="playlist-items">
      <h2>Your Playlist</h2>
      <ul className="audio-items">
        {playlist?.map((track, index) => (
          <li
            key={index}
            className="audio-flex"
            onClick={() => handlePlaylistItemClick(index)}
          >
            <div className="audio-card" style={{ background: darkmode ? "#E2703A" : "#353941" }} >
              <div
                className={`song-image ${
                  index === currentTrackIndex ? "song-image-1" : ""
                }  `}
              >
                {track && track.img && <img src={track.img} alt="Song cover" />}

                {currentTrackIndex === index ? (
                  <div className="play-icon">
                    {index === currentTrackIndex && isPlaying ? (
                      <FaPause />
                    ) : (
                      <FaPlay />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h5>{track && track.name && <span>{track.name}</span>}</h5>
              <div className="song-icons">
                <h2 onClick={()=>removeFromPlaylist(index)}>
                  <FiMinusCircle />
                </h2>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="removing-all">
        <button onClick={removeAllFromPlaylist}>remove all</button>
      </div>
    </section>
  );
};

export default PlaylistArray;
