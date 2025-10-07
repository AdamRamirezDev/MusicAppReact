import { useState } from "react";

export const BusquedaDeezer = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchSongs = async (query: string) => {
        if (!query) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            console.log(data);
            setTracks(data.data)
        } catch (error){
            console.log(error)
            setError("Error al buscar canciones");
        } finally {
            setLoading(false);
        }
    };
    
    return { tracks, loading, error, searchSongs };

}