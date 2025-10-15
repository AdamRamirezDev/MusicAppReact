import { useState } from "react";
import Busqueda from "./components/busqueda/busqueda";
import Home from "./components/mainMusic/mainMusic";
import Reproductor from "./components/reproductor/reproductor";
import type { Track, Album } from "../../../types/deezerTypes";

export default function PrincipalPage() {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  //Funcion que resetea y regresa al Main
  function resetToMain(){
    setIsSearching(false);
    setSelectedAlbum(null);
  }

  return (
    <div className="principal__container">
      <div className="division__container">
        <div className="division">
          {/*Componente de busqueda*/}
          <Busqueda
            setSearchResults={setSearchResults}
            setIsSearching={setIsSearching}
            resetToMain={resetToMain}
          />
          {/*Componentes de la pagina principal*/}
          <Home 
            searchResults={searchResults} 
            isSearching={isSearching} 
            onPlayTrack={setCurrentTrack}
            selectedAlbum={selectedAlbum}
            setSelectedAlbum={setSelectedAlbum}
          />
        </div>
      </div>
      <div className="division__reproductor">
        {/*Componente de reproduccion*/}
        <Reproductor currentTrack={currentTrack} />
      </div>
    </div>
  );
}
