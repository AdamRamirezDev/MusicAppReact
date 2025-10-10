import "./sidebar.css";
import type { ReproductorProps } from "../reproductor/reproductor";

export default function Sidebar({ currentTrack}: ReproductorProps){

    return (
        <div className="sidebar__container">
            <img className="sidebar__img" src={currentTrack?.album.cover_big}></img>
            <h1 className="sidebar__name">{currentTrack?.title}</h1>
            <p className="sidebar__autor">{currentTrack?.artist.name}</p>
            <p className="sidebar__caracteristicas"></p>
        </div>
    )
}