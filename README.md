# Rockify

Landing page dedicada al Rock Nacional Argentino: 36 artistas, 336 álbumes y
más de 3.800 canciones, con fichas de banda, discografías navegables y un
reproductor con estética de vinilo.

**En vivo:** https://guidoap87.github.io/rockify-web/

## Cómo está armado

- `index.html` — portada con la grilla de bandas
- `detalle.html` — ficha del artista y su discografía (`?id=`)
- `album.html` — tracklist de un álbum (`?artistId=&albumIndex=`)
- `script.js` — render de las tres páginas y el reproductor
- `styles.css` — estilos
- `data/artists.json` — la base de datos completa
- `index.js` — servidor Express que sirve el sitio y expone la API

El front lee `data/artists.json` directamente, así que el sitio funciona como
páginas estáticas (es lo que hace GitHub Pages). Si ese archivo no está
disponible, cae al servidor local en `http://localhost:3000/api/artists`.

## Correrlo local

```bash
npm install
node index.js
```

Y abrir http://localhost:3000.

## API

| Ruta                 | Devuelve                        |
| -------------------- | ------------------------------- |
| `GET /api/artists`   | Todos los artistas              |
| `GET /api/artists/:id` | Un artista por id (1 a 36)    |

## Agregar audio a una canción

En `data/artists.json` las canciones son strings. Para que una suene, se
reemplaza el string por un objeto y se deja el mp3 en `audio/`:

```json
"songs": ["Necesito", { "title": "Fuego", "file": "fuego.mp3" }]
```
