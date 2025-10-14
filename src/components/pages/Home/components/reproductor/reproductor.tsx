import "./reprodutor.css";
import type { Track } from "../../../../../hooks/busquedaDeezer";
import { useEffect, useRef, useState } from "react";

export interface ReproductorProps {
  currentTrack: Track | null;
}

export default function Reproductor({ currentTrack }: ReproductorProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.preview;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="reproductor__container">
      <div className="reproductor__container__cancion">
        <div className="reproductor__cancion__divisor">
          <img
            className="reproductor__cancion__img"
            src={currentTrack?.album.cover_small}
          ></img>

          <div className="reproductor__cancion__details">
            <p>{currentTrack?.title}</p>
            <p>{currentTrack?.artist.name}</p>
          </div>
        </div>
      </div>
      <div className="reproductor__container__controles">
        <button className="reproductor__btn" onClick={togglePlay}>{isPlaying ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fffefe" d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"/></svg> : 
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#fffefe" fill-opacity="0" stroke="#fffefe" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6l10 6l-10 6Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.475s" dur="0.475s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.475s" values="40;0"/></path></svg>
          }
          </button>
      </div>
      <audio ref={audioRef} />
      <div className="reproductor__container__volumen">
        <p>Icono</p>
        <input
          id="volume"
          type="range"
          min="0"
          max="20"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
