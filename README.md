# MusicAppReact

[](https://github.com/AdamRamirezDev/BrowserExtensionManager#browserextensionmanager)

Aplicación web React + TypeScript que muestra álbumes, canciones y playlists populares de Deezer usando un pequeño proxy Express local para evitar CORS y unificar respuestas. Permite buscar, ver pistas de un álbum o playlist y reproducir previews.

## Capturas


## Tecnologías 🔎
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) <br>
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)<br>
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) <br>
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) <br>
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) <br>
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) <br>
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) <br>
![REST API](https://img.shields.io/badge/REST%20API-02569B?style=for-the-badge&logo=swagger&logoColor=white) <br>


## Características 💎
Frontend: React (v19) + TypeScript, Vite <br>
Backend (proxy): Node + Express (ES modules) <br>
Fetch: node-fetch en el proxy <br>
Librerías: @splidejs/react-splide (carrusel), <br>
Linter / herramientas: ESLint, TypeScript <br>

## Endpoints utilizados
GET /api/albums
Descripción: devuelve los álbumes más populares.
Ejemplo respuesta: { data: [...] } (cada elemento es un Album) <br>
GET /api/tracks
Descripción: tracks más escuchados (chart top tracks).
Ejemplo respuesta: { data: [...] } o la estructura que retorne (en el proxy se estandariza a {data: ...} cuando corresponde). <br>
GET /api/playlists
Descripción: playlists populares (chart top playlists).
Ejemplo respuesta: { data: [...] } (cada elemento es un Playlist) <br>
GET /api/album/:id/tracks
Descripción: canciones de un álbum por id.
Ejemplo respuesta: { data: [Track, ...] } <br>
GET /api/playlist/:id/tracks
Descripción: canciones de una playlist por id.
Ejemplo respuesta: { data: [Track, ...] } <br>
GET /api/search?q=tu+consulta
Descripción: búsqueda en Deezer (tracks/artists/albums según query).
Ejemplo respuesta: { data: [Track, ...] } <br>

## Instalación 🔧
1-Clonar el proyecto: git clone [https://github.com/TUUSUARIO/NOMBRE_DEL_REPO.git](https://github.com/TUUSUARIO/NOMBRE_DEL_REPO.git)  
Cómo ejecutar (Windows PowerShell)
Requisitos: Node.js (v18+ recomendado), npm
Instalar dependencias:
npm install
Iniciar el proxy (desde la raíz del proyecto):
En una terminal PowerShell:
node server.js
Explicación: el proxy escucha por defecto en http://localhost:3001 y reenvía peticiones a la API de Deezer.
Iniciar la app React (en otra terminal):
npm run dev
Abrir en: http://localhost:5173 (o el puerto que Vite indique)
Build:
npm run build
Versión preview:
npm run preview

## Uso 💡

[](https://github.com/AdamRamirezDev/BrowserExtensionManager#uso-)

Es un proyecto simple que solo requiere visualizacion, se ven tarjetas activas e inactivas, en la parte de arriba se permite filtrarlas para una mejor experiencia de usuario.

## Demo 📌

[](https://github.com/AdamRamirezDev/BrowserExtensionManager#demo-)

Link al demo

## Licencia

[](https://github.com/AdamRamirezDev/BrowserExtensionManager#licencia)

All Rights Reserved.

## Contacto 🧭​

[](https://github.com/AdamRamirezDev/BrowserExtensionManager#contacto-)

💻 **Mi perfil de Linkedin:** [Linkedin](https://www.linkedin.com/in/adam-samuel-inzunza-ramirez/)  
🌐 **Mira mi portafolio!** [Portafolio](https://cuandoyolabi.github.io/PortafolioFrontend/)  
📩 **Email: [adaminzunza3@gmail.com](mailto:adaminzunza3@gmail.com)** ​  
📱 **Telefono: 3320664573**
