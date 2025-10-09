import { useState } from "react";
import Busqueda from "./components/busqueda/busqueda";
import Home from "./components/mainMusic/mainMusic";
import Reproductor from "./components/reproductor/reproductor";
import Sidebar from "./components/sidebar/sidebar";

export default function PrincipalPage() {
    
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="principal__container">
      <div className="division__container">
        <div className="division">
          {/*Componente de busqueda*/}
          <Busqueda setSearchResults={setSearchResults} setIsSearching={setIsSearching}/>

          {/*Componentes de la pagina principal*/}
          <Home searchResults={searchResults} isSearching={isSearching}/>
        </div>
        <div className="division__sidebar">
          {/*Componente Sidebar*/}
          <Sidebar />

        </div>
      </div>
      <div className="division__reproductor">
        {/*Componente de reproduccion*/}
        <Reproductor />

      </div>
    </div>
  );
}
