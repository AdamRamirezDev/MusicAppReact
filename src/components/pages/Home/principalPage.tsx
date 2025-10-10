import { useState } from "react";
import Busqueda from "./components/busqueda/busqueda";
import Home from "./components/mainMusic/mainMusic";
import Reproductor from "./components/reproductor/reproductor";
import Sidebar from "./components/sidebar/sidebar";
import type { Track } from "../../../hooks/busquedaDeezer";

export default function PrincipalPage() {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track[] | null>(null);

  return (
    <div className="principal__container">
      <div className="division__container">
        <div className="division">
          {/*Componente de busqueda*/}
          <Busqueda
            setSearchResults={setSearchResults}
            setIsSearching={setIsSearching}
          />
          {/*Componentes de la pagina principal*/}
          <Home 
            searchResults={searchResults} 
            isSearching={isSearching} 
            onPlayTrack={setCurrentTrack}
          />
        </div>
        <div className="division__sidebar">
          {/*Componente Sidebar*/}
          <Sidebar currentTrack={currentTrack} />
        </div>
      </div>
      <div className="division__reproductor">
        {/*Componente de reproduccion*/}
        <Reproductor currentTrack={currentTrack} />
      </div>
    </div>
  );
}
