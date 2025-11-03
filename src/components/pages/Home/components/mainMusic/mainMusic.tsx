import { useEffect, useState } from "react";
import "./mainMusic.css";
import type { Track, Album } from "../../../../../types/deezerTypes";

interface HomeProps {
  searchResults: Track[];
  isSearching: boolean;
  onPlayTrack: (track: Track) => void;
  selectedAlbum: Album | null;
  setSelectedAlbum: (album: Album | null) => void;
  onSetPlaylist: (tracks: Track[]) => void;
}

export default function Home({
  searchResults,
  isSearching,
  onPlayTrack,
  onSetPlaylist
}: HomeProps) {
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
        console.log("Albumes: ", data);
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
  if (isSearching && searchResults.length > 0) {
    return (
      <div className="home__container__design__songs">
        <div className="home__container__divisor">
          <h1 className="home__container__titulo__busqueda">
            Resultados de busqueda
          </h1>
        </div>
        {/*Contenedor que muestra orden */}
        <div className="home__container__order">
          <div className="order__information__num1">
            <p className="order__information__number">#</p>
            <p className="order__information__title">Titulo</p>
          </div>
          <div className="order__information__num2">
            <p>Album</p>
            <p>Duración</p>
            <p>Rank</p>
          </div>
        </div>

        {/* Contenedor de canciones */}
        <div className="home__container__songs">
          {searchResults.map((track) => {
            return (
              <div className="trak__item__song" key={track.id}>
                <div className="track__item__song__division__num1">
                  <p className="track__item__number">1222</p>
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="carta__album__btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fffefe"
                        fillOpacity="0"
                        stroke="#fffefe"
                        strokeDasharray="40"
                        strokeDashoffset="40"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 6l10 6l-10 6Z"
                      >
                        <animate
                          fill="freeze"
                          attributeName="fill-opacity"
                          begin="0.475s"
                          dur="0.475s"
                          values="0;1"
                        />
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.475s"
                          values="40;0"
                        />
                      </path>
                    </svg>
                  </button>
                  <img
                    className="track__item__song__img"
                    src={track.album.cover_small}
                    alt={track.title}
                  ></img>
                </div>
                <div className="track__item__song__division__num2">
                  <h3>{track.title}</h3>
                  <p>{track.artist.name}</p>
                </div>
                <div className="track__item__duration">
                  <p className="track__item__album__title">
                    {track.album.title}
                  </p>
                  <p className="track__item__song__duration">
                    {track.duration}
                  </p>
                  <p className="track__item__song__rank">{track.rank}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* Mostrar canciones del album que se selecciono */
  const handleAlbumClick = async (album: Album) => {
    try {
      console.log("Album ID recibido: ", album.id);
      setSelectedAlbum(album);
      const response = await fetch(
        `http://localhost:3001/api/album/${album.id}/tracks`
      );
      const data = await response.json();
      console.log("Funcion hanlde, esta es la info: ", data);
      setSelectedAlbumTracks(data.data);
      onSetPlaylist(data.data);
    } catch (error) {
      console.error("Error al cargar las canciones del album", error);
    }
  };

  if (loading) return <p>Cargando álbumes...</p>;
  if (error) return <p>{error}</p>;

  /* Resultados de el album seleccionado */
  if (selectedAlbum) {
    return (
      <div className="home__container__design__songs">
        <div className="home__divisor__album">
          <img
            src={selectedAlbum.cover_medium}
            className="home__album__img"
          ></img>
          <div className="home__album__principal__information">
            <p className="home__album__text">Lista publica</p>
            <p className="home__album__titulo">{selectedAlbum.title}</p>
            <p className="home__album__artista">{selectedAlbum.artist.name}</p>
          </div>
        </div>
        <div className="home__container__order">
          <div className="order__information__num1">
            <p className="order__information__number">#</p>
            <p className="order__information__title">Titulo</p>
          </div>
          <div className="order__information__num2">
            <p>Album</p>
            <p>Duración</p>
            <p>Rank</p>
          </div>
        </div>

        <div className="home__container__songs">
          {selectedAlbumTracks.map((song) => (
            <div key={song.id} className="trak__item__song">
              <div className="track__item__song__division__num1">
                <p className="track__item__number">1222</p>
                <button
                  onClick={() => {
                    onPlayTrack(song)
                    onSetPlaylist(selectedAlbumTracks)
                  }}
                  className="carta__album__btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fffefe"
                      fillOpacity="0"
                      stroke="#fffefe"
                      strokeDasharray="40"
                      strokeDashoffset="40"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 6l10 6l-10 6Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="0.475s"
                        dur="0.475s"
                        values="0;1"
                      />
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.475s"
                        values="40;0"
                      />
                    </path>
                  </svg>
                </button>
                <img
                  className="track__item__song__img"
                  src={selectedAlbum.cover_small}
                  alt={song.title}
                ></img>
              </div>
              <div className="track__item__song__division__num2">
                <h3>{song.title}</h3>
                <p>{selectedAlbum.artist.name}</p>
              </div>
              <div className="track__item__duration">
                <p className="track__item__album__title">{selectedAlbum.title}</p>
                <p className="track__item__song__duration">{song.duration}</p>
                <p className="track__item__song__rank">{song.rank}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Resultados de los albumes mas escuchados */
  return (
    <div className="home__container__design">
      <div className="home__container__divisor">
        <p className="home__container__titulo">Albumes mas escuchados</p>
        <p className="home__container__text">
          Lo estan rompiendo en America Latina
        </p>
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

