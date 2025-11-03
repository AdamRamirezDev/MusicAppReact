import "./busqueda.css";
import { BusquedaDeezer } from "../../../../../hooks/busquedaDeezer";
import React, { useEffect } from "react";
import type { Track } from "../../../../../types/deezerTypes";

interface BusquedaProps {
  setSearchResults: (tracks: Track[]) => void;
  setIsSearching: (value: boolean) => void;
  resetToMain: () => void;
}

export default function Busqueda({ setSearchResults, setIsSearching,resetToMain }: BusquedaProps) {
    
    const [query, setQuery] = React.useState("");
    const { tracks, searchSongs } = BusquedaDeezer();

    //Funcion que mostrar los resultados
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if(e.key === "Enter"){
        e.preventDefault();
        setIsSearching(true);
        searchSongs(query);
        setQuery("");
      }  
    }

    // Funcion para regresar al inicio
    function handleClick(){
      resetToMain();
      
    }

    useEffect(() => {
      if(tracks.length > 0){
        setSearchResults(tracks);
      }
    }, [tracks]);

    return (
    <div className="busqueda__container">
      <button 
        className="back__btn"
        onClick={handleClick}
      ><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#fffefe" d="M12 3s-6.186 5.34-9.643 8.232A1.04 1.04 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1a.98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3"/></svg></button>
      <input
        className="input__busqueda"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="¿Que quieres escuchar?"
      ></input>
    </div>
  );
}
