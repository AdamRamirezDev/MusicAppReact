import "./reprodutor.css";
import { useEffect, useRef, useState } from "react";
import type { Track } from "../../../../../types/deezerTypes";

export interface ReproductorProps {
  currentTrack: Track | null;
  playlist: Track[],
  onChangeTrack: (track: Track) => void;
}

export default function Reproductor({ currentTrack, playlist, onChangeTrack }: ReproductorProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<true | false>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  //console.log(playlist)

  //Cambio de cancion
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.preview;
      audioRef.current.play();
      setIsPlaying(true);
      console.log("CURRENT TRACK: ", currentTrack)
    }
  }, [currentTrack]);

  //Cambio de volumen
  useEffect(() => {
    if(audioRef.current){
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Detecta el cambio de la cancion
  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    }

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    }
  }, []);

  // Cambio de cancion con next y back
  useEffect(() => {
    if (playlist && currentTrack){
      const index = playlist.findIndex(t => t.id === currentTrack.id);
      setCurrentIndex(index);
    }
  }, [currentTrack, playlist])

  // Formateo de segundos y minutos
  const formatTime = (time: number) => {
    if(isNaN(time)) return "0.00";
    const minutos = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutos}:${seconds}`;
  };

  //Funcion que te permite cambiar manualmente el progreso
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if(audioRef.current){
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // Boton de play y pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //Boton de next
  const handleNext = () => {
    console.log(playlist)
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    onChangeTrack(nextTrack);
  };

  //Boton de back
  const handleBack = () => {
    if(!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id)
    const backIndex = (currentIndex - 1) % playlist.length;
    const prevTrack = playlist[backIndex]
    onChangeTrack(prevTrack);
  };

  return (
    <div className="reproductor__container">
      {/* nombre y album*/}
      <div className="reproductor__container__cancion">
        <div className="reproductor__cancion__divisor">
          <div className="reproductor__cancion__details">
            <p className="reproductor__cancion__title">{currentTrack?.title}</p>
            <p className="reproductor__cancion__artista">{currentTrack?.artist.name}</p>
          </div>
        </div>
      </div>
      {/* Botones y barra de progreso*/}
      <div className="reproductor__container__controles">
        <div className="reproductor__container__controles__division">
          <button 
            className="reproductor__back"
            onClick={handleBack}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffffff" d="M27 28a1 1 0 0 1-.501-.135l-19-11a1 1 0 0 1 0-1.73l19-11A1 1 0 0 1 28 5v22a1 1 0 0 1-1 1M2 4h2v24H2z"/></svg>
          </button>
          <button className="reproductor__btn" onClick={togglePlay}>{isPlaying ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000ff" d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"/></svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#000000ff" fillOpacity="0" stroke="#fffefe" strokeDasharray="40" strokeDashoffset="40" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 6l10 6l-10 6Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.475s" dur="0.475s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.475s" values="40;0"/></path></svg>
            }
            </button>
          <audio ref={audioRef} />
          <button 
            className="reproductor__next"
            onClick={handleNext}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffffff" d="M26.002 5a1 1 0 1 1 2 0v22a1 1 0 0 1-2 0zM3.999 6.504c0-2.002 2.236-3.192 3.897-2.073l14.003 9.432A2.5 2.5 0 0 1 21.912 18L7.909 27.56c-1.66 1.132-3.91-.056-3.91-2.065z"/></svg>
          </button>
        </div>
        <div className="reproductor__container__barraProgreso">
        <span>{formatTime(currentTime)}</span>
        <input
            className="barra__progreso"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={progress}
            onChange={handleSeek}
        ></input>
        <div className="reproductor__tiempos">
          <span>{formatTime(duration)}</span>
        </div>
        </div>
      </div>
      {/* Barra de sonido */}
      <div className="reproductor__container__volumen">
        {}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fffefe" d="M5 6.5v11H1v-11zm2 11.71l8 4.5V1.29l-8 4.5zM21.581 7.78l-.602-.799l-1.596 1.206l.602.798a5 5 0 0 1-.002 6.03l-.603.797l1.595 1.206l.603-.797a7 7 0 0 0 .003-8.442"/><path fill="#fffefe" d="m18.789 9.889l-.603-.798l-1.596 1.205l.603.798a1.5 1.5 0 0 1 0 1.809l-.604.797l1.595 1.207l.603-.798a3.5 3.5 0 0 0 .002-4.22"/></svg>
        <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
