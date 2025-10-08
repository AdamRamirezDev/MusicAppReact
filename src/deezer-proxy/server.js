import express from"express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

//Endopoints de busqueda
app.get("/api/search", async (req, res) => {
    const { q } = req.query;

    if(!q) return res.status(400).json({error: "Query missing"});

    try {
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);
        const data = await response.json();
        res.json(data);
    } catch(error){
        res.status(500).json({error: "Error al conectar con Deezer"});
    }
});

// Endopoints de albumes populares
app.get("/api/albums", async (req, res) => {
    try{
        const response = await fetch("https://api.deezer.com/chart/0/albums?limit=10");
        const data = await response.json();
        res.json({data: data.albums.data});
    } catch( data ){
        res.status(500).json({error: "Error al obtener albumes"});
    }
});

app.listen(PORT, () => {
    console.log(`proxy server running on port: ${PORT}`);
})
