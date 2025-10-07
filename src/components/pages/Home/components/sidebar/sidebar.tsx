import "./sidebar.css";

export default function Sidebar(){
    
    return (
        <div className="sidebar__container">
            <p className="sidebar__title">Nombre de la cancion</p>
            <div className="sidebar__img"></div>
            <p className="sidebar__name"></p>
            <p className="sidebar__autor"></p>
            <p className="sidebar__caracteristicas"></p>
        </div>
    )
}