import { useEffect, useState } from "react";
import "./mainMusi.css";
import axios from 'axios';

export default function Home(){
    
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('https://api.deezer.com/chart/0/albums?limit=10')
                setAlbums(response.data.data);
            } catch(error){
                console.error(error)
            }
        };

        fetchAlbums();
    }, []);

    return(
        <div className="home__container">
            {/* Aqui pondre el componente SongCard*/}
        </div>
    )

}