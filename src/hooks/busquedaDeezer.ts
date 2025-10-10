import { useState } from "react";

export interface Track {
    id: number,
    title: string,
    artist: {
        id: number;
        name: string;
    },
    album: {
        title: string,
        cover_small: string,
        cover_medium: string,
    },
    preview: string
    
}

export const BusquedaDeezer = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
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