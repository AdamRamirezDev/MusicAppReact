import { useEffect, useState } from "react";
import "./mainMusic.css";
import type { Track } from "../../../../../hooks/busquedaDeezer";

interface Album {
  id: number;
  cover_small: string;
  cover_medium: string;
  title: string;
  artist: { name: string };
}

interface HomeProps {
  searchResults: Track[];
  isSearching: boolean;
}

export default function Home({ searchResults, isSearching}: HomeProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando álbumes...</p>;
  if (error) return <p>{error}</p>;

  /* Resultados del buscador */
  if(isSearching && searchResults.length > 0){
    return (
      <>
       <div className="home__container__divisor">
        <h1 className="home__container__titulo__busqueda">Resultados de busqueda</h1>
      </div>
      <div className="home__container">
        {searchResults.map((track) => {
          return (
          <div className="carta__album__busqueda" key={track.id}>
            <img className="carta__album__img" src={track.album.cover_medium} alt={track.title}></img>
            <h3>{track.title}</h3>
            <p>{track.artist.name}</p>
          </div>
          )})}
      </div>
      </>
    );
  }
  /* Resultados de los albumes mas escuchados */
  return (
    <>
      <div className="home__container__divisor">
        <h1 className="home__container__titulo">Albumes mas escuchados</h1>
      </div>
      <div className="home__container">
        {albums.map((album) => (
          <div className="carta__album">
            <div key={album.id}>
              <img
                src={album.cover_medium}
                alt={album.title}
                className="carta__album__img"
              ></img>
              <h3 className="carta__album__titulo">{album.title}</h3>
              <p className="carta__album__description">{album.artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
