import "./busqueda.css";
import { BusquedaDeezer } from "../../../../../hooks/busquedaDeezer";
import React from "react";

export default function Busqueda() {
    
    const [query, setQuery] = React.useState("");
    const { tracks, loading, error, searchSongs } = BusquedaDeezer();

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if(e.key === "Enter"){
        e.preventDefault();
        searchSongs(query);
      }  

    }

    return (
    <div className="busqueda__container">
      <input
        className="input__busqueda"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="¿Que quieres escuchar?"
      ></input>

        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

      <div>
        {tracks.map((track) => (
            <div key={track.id}>
                {track.title}
            </div>
        ))}
      </div>
    </div>
  );
}
