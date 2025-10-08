import { useEffect, useState } from "react";
import "./mainMusi.css";

interface Album {

    id: number,
    cover_medium: string,
    title: string,
    artist: { name: string }

};

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/albums");
        const data = await response.json();
        console.log(data)
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

  return (
    <div className="home__container">
      <div className="album-card">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img src={album.cover_medium} alt={album.title}></img>
            <h3>{album.title}</h3>
            <p>{album.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
