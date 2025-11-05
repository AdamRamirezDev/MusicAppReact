import { useEffect, useState } from "react";
import Busqueda from "./components/busqueda/busqueda";
import Home from "./components/mainMusic/mainMusic";
import Reproductor from "./components/reproductor/reproductor";
import type { Track, Album, Playlist } from "../../../types/deezerTypes";

export default function PrincipalPage() {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState<true | false>(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  //Funcion que regresa al inicio
  function resetToMain(){
    setIsSearching(false);
    setSelectedAlbum(null);
    setSelectedPlaylist(null);
  }

  //Funcion que recibe la playlist de mainMusic
  function handleSetPlaylist(tracks: Track[]){
    console.log(playlist)
    setPlaylist(tracks);
    console.log(playlist)
  }

  useEffect(() => {
    if(searchResults.length > 0){
      setPlaylist(searchResults);
    }
  }, [searchResults]);

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
            setSelectedAlbum={setSelectedAlbum}
            selectedAlbum={selectedAlbum}
            onSetPlaylist={handleSetPlaylist}
            selectedPlaylist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
          />
        </div>
      </div>
      <div className="division__reproductor">
        {/*Componente de reproduccion*/}
        <Reproductor 
          currentTrack={currentTrack} 
          playlist={playlist}
          onChangeTrack={setCurrentTrack}
        />
      </div>
    </div>
  );
}
