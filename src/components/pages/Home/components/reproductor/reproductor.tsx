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
        <button onClick={togglePlay}>{isPlaying ? "PAUSA" : "PLAY"}</button>
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
