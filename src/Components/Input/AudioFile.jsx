import React from 'react'
import { useMusicContext } from '../../Context'

const Audio = () => {


 const {currentTrackIndex,handleTimeUpdate,setAudioRef,playlist} = useMusicContext()

  return (
<section className="audio-file">
<audio
        ref={(audio) => setAudioRef(audio)}
        src={playlist[currentTrackIndex]?.file}
        onTimeUpdate={handleTimeUpdate}
        controls
      />
</section>
  )
}

export default Audio
