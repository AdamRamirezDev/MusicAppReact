import { useEffect, useState } from "react";
import "./mainMusic.css";
import type { Track } from "../../../../../hooks/busquedaDeezer";

interface Album {
  id: number;
  cover_small: string;
  cover_medium: string;
  title: string;
  artist: { 
    name: string 
    picture: string,
      md5_image: string,
  };
  duration: number,
}

interface HomeProps {
  searchResults: Track[];
  isSearching: boolean;
  onPlayTrack: (track: Track) => void;
}

export default function Home({ searchResults, isSearching, onPlayTrack}: HomeProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAlbumTracks, setSelectedAlbumTracks] = useState<Track[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/albums");
        const data = await response.json();
        console.log(data);
        setAlbums(data.data);
      } catch (error) {
        console.error(error);
        setError("Errror al cargar los albumes");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  /* Resultados del buscador */
  if(isSearching && searchResults.length > 0){
    return (
      <div className="home__container__design__songs">
       <div className="home__container__divisor">
        <h1 className="home__container__titulo__busqueda">Resultados de busqueda</h1>
      </div>
      {/*Contenedor que muestra orden */}
      <div className="home__container__order">
        <p>#</p>
        <p>Titulo</p>
        <p>Artista</p>
        <p>Album</p>
        <p>Duracion</p>
        <p>Rank</p>
      </div>
      
      <div className="home__container__songs">
        {searchResults.map((track) => {
          return (
          <div className="trak__item__song" key={track.id}>
            <div className="track__item__song__division__num1">
              <p>1222</p>
              <button onClick={() => onPlayTrack(track)} className="carta__album__btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fffefe" fill-opacity="0" stroke="#fffefe" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6l10 6l-10 6Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.475s" dur="0.475s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.475s" values="40;0"/></path></svg></button>
              <img className="track__item__song__img" src={track.album.cover_small} alt={track.title}></img>
            </div>
            <div className="track__item__song__division__num2">
              <h3>{track.title}</h3>
              <p>{track.artist.name}</p>
            </div>
            <div className="track__item__duration">
              <p>{track.album.title}</p>
              <p>{track.duration}</p>
              <p>{track.rank}</p>

            </div>
          </div>
          )})}
      </div>
      </div>
    );
  }

  /* Mostrar canciones del album que se selecciono */ 
  const handleAlbumClick = async (album: Album) => {
    try {
      console.log("Album ID recibido: ", album.id)
      setSelectedAlbum(album);
      const response = await fetch(`http://localhost:3001/api/album/${album.id}/tracks`);
      const data = await response.json();
      console.log("Funcion hanlde, esta es la info: ", data)
      setSelectedAlbumTracks(data.data);
    } catch (error){
      console.error("Error al cargar las canciones del album", error);
    }
  };

  if (loading) return <p>Cargando álbumes...</p>;
  if (error) return <p>{error}</p>;

  /* Resultados de el album seleccionado */
  if(selectedAlbum){
    return (
      <>
        <div className="home__divisor__album">
            <img src={selectedAlbum.cover_medium} className="home__album__img"></img>
            <div className="home__album__principal__information">
              <p className="home__album__text">Lista publica</p>
              <p className="home__album__titulo">{selectedAlbum.title}</p>
              <p className="home__album__artista">{selectedAlbum.artist.name}</p>
            </div>
          </div>
          <div className="home__album__songs">
            {selectedAlbumTracks.map((track) => (
              <div key={track.id} className="track__item">
                <button onClick={() => onPlayTrack(track)} className="carta__album__btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fffefe" fill-opacity="0" stroke="#fffefe" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 6l10 6l-10 6Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.475s" dur="0.475s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.475s" values="40;0"/></path></svg></button>
                <img src={selectedAlbum.cover_small} className="track__item__img"></img>
                <p>{track.title}</p>
              </div>
            ))}
          </div>
      </>
    );
  }

  /* Resultados de los albumes mas escuchados */
  return (
    <div className="home__container__design">
      <div className="home__container__divisor">
        <p className="home__container__titulo">Albumes mas escuchados</p>
        <p className="home__container__text">Lo estan rompiendo en America Latina</p>
      </div>
      <div className="home__container">
        {albums.map((album) => (
          <div className="carta__album">
            <div key={album.id}>
              <img
                src={album.cover_medium}
                alt={album.title}
                onClick={() => handleAlbumClick(album)}
                className="carta__album__img"
              ></img>
              <h3 className="carta__album__titulo">{album.title}</h3>
              <p className="carta__album__description">{album.artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
