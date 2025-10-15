import "./busqueda.css";
import { BusquedaDeezer } from "../../../../../hooks/busquedaDeezer";
import React, { useEffect } from "react";
import type { Track } from "../../../../../types/deezerTypes";


interface BusquedaProps {
  setSearchResults: (tracks: Track[]) => void;
  setIsSearching: (value: boolean) => void;
}

export default function Busqueda({ setSearchResults, setIsSearching }: BusquedaProps) {
    
    const [query, setQuery] = React.useState("");
    const { tracks, searchSongs } = BusquedaDeezer();

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if(e.key === "Enter"){
        e.preventDefault();
        setIsSearching(true);
        searchSongs(query);
        setQuery("");
      }  
    }

    useEffect(() => {
      if(tracks.length > 0){
        setSearchResults(tracks);
      }
    }, [tracks]);

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
    </div>
  );
}
