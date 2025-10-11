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
        <button onClick={togglePlay}>{isPlaying ? "PAUSA" : 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fffefe" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m-1.306-6.154l4.72-2.787c.781-.462.781-1.656 0-2.118l-4.72-2.787C9.934 7.706 9 8.29 9 9.214v5.573c0 .923.934 1.507 1.694 1.059" clip-rule="evenodd"/></svg> }
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
